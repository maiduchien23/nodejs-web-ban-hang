const { Op } = require("sequelize");
const permissionUtils = require("../../../utils/permissionUtils");
const models = require("../../../models/index");
const { getPaginateUrl } = require("../../../utils/url");
const { Combo, ComboItem, Product, ProductColor, ProductSize, ProductVariant } =
  models;
const moduleName = "Sản phẩm";
module.exports = {
  index: async (req, res) => {
    const title = "Danh sách combo";
    const userName = req.user.name;
    const filters = {};

    let { keyword, page, recordNumber } = req.query;
    if (!recordNumber) {
      recordNumber = 5;
    }

    if (keyword) {
      filters[Op.or] = [
        {
          name: {
            [Op.like]: `%${keyword}%`,
          },
        },
      ];
    }

    // Get total count of records
    const totalCountObj = await Combo.findAndCountAll({
      where: filters,
    });
    const totalCount = totalCountObj.count;
    const totalPage = Math.ceil(totalCount / recordNumber);

    if (!page || page < 1) {
      page = 1;
    }
    if (page > totalPage && page > 1) {
      page = totalPage;
    }

    const offset = (page - 1) * recordNumber;
    const products = await Product.findAll();

    const combos = await Combo.findAll({
      include: {
        model: ComboItem,
        attributes: ["productId", "quantity"],
      },

      where: filters,
      limit: +recordNumber,
      offset: offset,
    });

    const permissionUser = await permissionUtils.roleUser(req);

    res.render("admin/combo/index", {
      req,
      combos,
      title,
      moduleName,
      totalPage,
      totalCount,
      permissionUser,
      getPaginateUrl,
      permissionUtils,
      page,
      recordNumber,
      userName,
      products,
    });
  },
  add: async (req, res) => {
    try {
      // Lấy danh sách sản phẩm để hiển thị trong form
      const products = await Product.findAll({
        include: [
          { model: ProductVariant, include: [ProductColor, ProductSize] },
        ],
      });
      const title = "Thêm combo";
      const userName = req.user.name;
      const errors = req.flash("errors");
      const success = req.flash("success");

      const permissionUser = await permissionUtils.roleUser(req);

      res.render("admin/combo/add", {
        title,
        moduleName,
        products,
        errors,
        success,
        permissionUser,
        permissionUtils,
        userName,
      });
    } catch (error) {
      console.error("Error rendering add combo form:", error);
      req.flash("errors", "Đã xảy ra lỗi khi tải trang thêm combo");
      res.redirect("/admin/combos");
    }
  },

  store: async (req, res) => {
    try {
      const { name, price, description, comboItems, comboQuantities } =
        req.body;
      // Tạo combo mới
      const newCombo = await Combo.create({
        name,
        price,
        description,
      });

      // Tạo các mục trong combo

      if (
        !Array.isArray(comboItems) ||
        !Array.isArray(comboQuantities) ||
        comboItems.length !== comboQuantities.length
      ) {
        console.error("Combo items or quantities are missing or invalid.");
        req.flash("errors", "Dữ liệu mục combo hoặc số lượng không hợp lệ.");
        return res.redirect("/admin/combos/add");
      }

      for (let i = 0; i < comboItems.length; i++) {
        await ComboItem.create({
          comboId: newCombo.id,
          productId: comboItems[i],
          quantity: comboQuantities[i],
        });
      }

      req.flash("success", "Thêm combo sản phẩm thành công");
      return res.redirect("/admin/combos");
    } catch (error) {
      console.error("Error creating combo:", error);
      req.flash("errors", "Đã xảy ra lỗi khi tạo combo sản phẩm");
      res.redirect("/admin/combos/add");
    }
  },

  edit: async (req, res) => {
    try {
      const { id } = req.params;
      const userName = req.user.name;
      const errors = req.flash("errors");
      const title = "Sửa combo";
      const success = req.flash("success");

      // Tìm combo theo ID và lấy thông tin của nó
      const combo = await Combo.findByPk(id, {
        include: [{ model: ComboItem, include: [{ model: Product }] }],
      });

      if (!combo) {
        req.flash("errors", "Không tìm thấy combo");
        return res.redirect("/admin/combos");
      }

      // Lấy danh sách sản phẩm để hiển thị trong form
      const products = await Product.findAll();

      const permissionUser = await permissionUtils.roleUser(req);

      res.render("admin/combo/edit", {
        title,
        moduleName,
        combo,
        products,
        errors,
        success,
        permissionUser,
        permissionUtils,
        userName,
      });
    } catch (error) {
      console.error("Error rendering edit combo form:", error);
      req.flash("errors", "Đã xảy ra lỗi khi tải trang chỉnh sửa combo");
      res.redirect("/admin/combos");
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      console.log("ID:", id);
      const { name, price, description, comboItems } = req.body;

      // Tìm combo theo ID
      const combo = await Combo.findByPk(id);

      if (!combo) {
        req.flash("errors", "Không tìm thấy combo");
        return res.redirect("/admin/combos");
      }

      // Cập nhật thông tin của combo
      await combo.update({ name, price, description });

      // Cập nhật các mục trong combo
      await Promise.all(
        comboItems.map(async (itemData) => {
          const comboItem = await ComboItem.findByPk(itemData.id);

          if (!comboItem) {
            throw new Error(`Combo item with id ${itemData.id} not found.`);
          }

          // Cập nhật thông tin của mục trong combo
          await comboItem.update({ quantity: itemData.quantity });
        })
      );

      req.flash("success", "Cập nhật combo sản phẩm thành công");
      return res.redirect(`/admin/combos/edit/${id}`);
    } catch (error) {
      console.error("Error updating combo:", error);
      req.flash("errors", "Đã xảy ra lỗi khi cập nhật combo sản phẩm");
      res.redirect(`/admin/combos`);
    }
  },

  // Xóa combo
  destroy: async (req, res) => {
    try {
      const { id } = req.params;

      // Xóa combo theo ID
      await Combo.destroy({
        where: {
          id: id,
        },
      });

      req.flash("success", "Xóa combo sản phẩm thành công");
      return res.redirect("/admin/combos");
    } catch (error) {
      console.error("Error deleting combo:", error);
      req.flash("errors", "Đã xảy ra lỗi khi xóa combo sản phẩm");
      res.redirect("/admin/combos");
    }
  },
};
