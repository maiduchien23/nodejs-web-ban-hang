const { validationResult } = require("express-validator");
const models = require("../../../models/index");
const moment = require("moment");
const { Op } = require("sequelize");

const { getPaginateUrl } = require("../../../utils/url");
const permissionUtils = require("../../../utils/permissionUtils");
const validate = require("../../../utils/validate");

const { ProductVariant, Product, ProductColor, ProductSize } = models;

const moduleName = "Sản phẩm";

module.exports = {
  index: async (req, res) => {
    const title = "Danh sách biến thể sản phẩm";
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
        {
          description: {
            [Op.like]: `%${keyword}%`,
          },
        },
      ];
    }

    // Lấy tổng số bản ghi
    const totalCountObj = await ProductVariant.findAndCountAll({
      include: [
        {
          model: Product,
        },
        {
          model: ProductColor,
          attributes: ["name"],
        },
        {
          model: ProductSize,
          attributes: ["name"],
        },
      ],
      where: filters,
    });
    // Lấy tổng số trang
    const totalCount = totalCountObj.count;
    const totalPage = Math.ceil(totalCount / recordNumber);
    // Lấy số trang
    if (!page || page < 1) {
      page = 1;
    }
    if (page > totalPage && page > 1) {
      page = totalPage;
    }

    const offset = (page - 1) * recordNumber;
    const productVariants = await ProductVariant.findAll({
      include: [
        {
          model: Product,
        },
        {
          model: ProductColor,
          attributes: ["name"],
        },
        {
          model: ProductSize,
          attributes: ["name"],
        },
      ],
      where: filters,
      limit: +recordNumber,
      offset: offset,
    });

    const permissionUser = await permissionUtils.roleUser(req);

    res.render("admin/productVariant/index", {
      req,
      productVariants,
      moment,
      title,
      moduleName,
      permissionUser,
      permissionUtils,
      totalPage,
      page,
      getPaginateUrl,
      recordNumber,
      userName,
    });
  },

  add: async (req, res) => {
    const userName = req.user.name;
    const errors = req.flash("errors");
    const success = req.flash("success");
    const title = "Thêm biến thể sản phẩm";

    const products = await Product.findAll();
    const colors = await ProductColor.findAll();
    const sizes = await ProductSize.findAll();

    const permissionUser = await permissionUtils.roleUser(req);

    res.render("admin/productVariant/add", {
      errors,
      success,
      title,
      validate,
      moment,
      userName,
      getPaginateUrl,
      products,
      colors,
      sizes,
      moduleName,
      permissionUser,
      permissionUtils,
    });
  },

  store: async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        req.flash("errors", result.errors);
        return res.redirect("/admin/productVariants/add");
      }
      const { productId, colorId, sizeId, price, quantityAvailable } = req.body;
      await ProductVariant.create({
        productId,
        colorId,
        sizeId,
        price,
        quantityAvailable,
      });
      req.flash("success", "Thêm biến thể thành công");
      res.redirect("/admin/productVariants");
    } catch (error) {
      console.error("Error storing product variant:", error);
      req.flash("errors", "Đã xảy ra lỗi khi thêm biến thể sản phẩm");
      res.redirect("/admin/productVariants/add");
    }
  },

  edit: async (req, res) => {
    try {
      const { id } = req.params;

      const userName = req.user.name;
      const errors = req.flash("errors");
      const title = "Sửa sản biến thể phẩm";

      const success = req.flash("success");
      const productVariant = await ProductVariant.findByPk(id);
      const products = await Product.findAll();
      const colors = await ProductColor.findAll();
      const sizes = await ProductSize.findAll();

      const permissionUser = await permissionUtils.roleUser(req);

      res.render("admin/productVariant/edit", {
        title,
        errors,
        success,
        userName,
        productVariant,
        products,
        colors,
        sizes,
        permissionUser,
        permissionUtils,
        moduleName,
        getPaginateUrl,
      });
    } catch (error) {
      console.error(
        "Error fetching product variant, products, colors, or sizes:",
        error
      );
      res
        .status(500)
        .send(
          "Đã xảy ra lỗi khi lấy thông tin biến thể sản phẩm, sản phẩm, màu sắc hoặc kích thước"
        );
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const result = validationResult(req);
      if (!result.isEmpty()) {
        req.flash("errors", result.errors);
        return res.redirect(`/admin/productVariants/edit/${id}`);
      }

      const { productId, colorId, sizeId, price, quantityAvailable } = req.body;

      await ProductVariant.update(
        {
          productId,
          colorId,
          sizeId,
          price,
          quantityAvailable,
        },
        {
          where: { id: id },
        }
      );

      req.flash("success", "Cập nhật biến thể sản phẩm thành công");
      res.redirect(`/admin/productVariants/edit/${id}`);
    } catch (error) {
      console.error("Error updating product variant:", error);
      req.flash("errors", "Đã xảy ra lỗi khi cập nhật biến thể sản phẩm");
      res.redirect(`/admin/productVariants/edit/${id}`);
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      await ProductVariant.destroy({
        where: { id: id },
      });
      req.flash("success", "Xóa biến thể sản phẩm thành công");
      res.redirect("/admin/productVariants");
    } catch (error) {
      console.error("Error deleting product variant:", error);
      req.flash("errors", "Đã xảy ra lỗi khi xóa biến thể sản phẩm");
      res.redirect("/admin/productVariants");
    }
  },

  getProductVariants: async (req, res) => {
    try {
      const { productId } = req.params;
      console.log(`Fetching variants for product ID: ${productId}`);

      const product = await Product.findByPk(productId);
      if (!product) {
        console.log(`Product with ID ${productId} not found`);
        return res.status(404).send("Product not found");
      }

      const productVariants = await ProductVariant.findAll({
        where: { productId },
        include: [
          { model: ProductColor, attributes: ["name"] },
          { model: ProductSize, attributes: ["name"] },
        ],
      });

      if (!productVariants.length) {
        console.log(`No variants found for product ID ${productId}`);
        return res.status(404).send("No variants found for this product");
      }

      const permissionUser = await permissionUtils.roleUser(req);

      res.render("admin/productVariant/list", {
        req,
        productVariants,
        product,
        getPaginateUrl,
        moduleName,
        moment,
        title: "Danh sách biến thể sản phẩm",
        moduleName,
        permissionUser,
        permissionUtils,
      });
    } catch (error) {
      console.error("Error fetching product variants:", error);
      res.status(500).send("Đã xảy ra lỗi khi lấy danh sách biến thể sản phẩm");
    }
  },
};
