const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
const model = require("../../../models/index");
const { getPaginateUrl } = require("../../../utils/url");
const Size = model.ProductSize;
const permissionUtils = require("../../../utils/permissionUtils");

const moduleName = "Kích thước ";

module.exports = {
  index: async (req, res) => {
    const title = "Danh sách kích thước";
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
    const totalCountObj = await Size.findAndCountAll({
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
    const sizes = await Size.findAll({
      where: filters,
      limit: +recordNumber,
      offset: offset,
    });

    const permissionUser = await permissionUtils.roleUser(req);

    res.render("admin/size/index", {
      req,
      sizes,
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
    });
  },

  add: async (req, res) => {
    const title = "Thêm kích thước";
    const userName = req.user.name;
    const errors = req.flash("errors");
    const success = req.flash("success");

    const permissionUser = await permissionUtils.roleUser(req);

    res.render("admin/size/add", {
      title,
      errors,
      moduleName,
      permissionUser,
      permissionUtils,
      success,
      userName,
    });
  },

  store: async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const { name } = req.body;

      await Size.create({
        name: name,
      });

      req.flash("success", "Thêm kích thước thành công");
      return res.redirect("/admin/categories");
    }

    req.flash("errors", result.errors);
    res.redirect("/admin/sizes/add");
  },

  edit: async (req, res) => {
    const { id } = req.params;
    const userName = req.user.name;
    const errors = req.flash("errors");
    const title = "Sửa kích thước";
    const success = req.flash("success");

    const size = await Size.findOne({
      where: {
        id: id,
      },
    });

    const permissionUser = await permissionUtils.roleUser(req);

    res.render("admin/size/edit", {
      size,
      title,
      errors,
      permissionUser,
      permissionUtils,
      moduleName,
      success,
      userName,
    });
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const result = validationResult(req);
    if (result.isEmpty()) {
      await Size.update(
        {
          name: name,
        },
        {
          where: {
            id: id,
          },
        }
      );
      req.flash("success", "Cập nhập kích thước thành công");
      return res.redirect(`/admin/sizes/edit/${id}`);
    }

    req.flash("errors", result.errors);
    res.redirect(`/admin/sizes/edit/${id}`);
  },

  destroy: async (req, res) => {
    const { id } = req.params;
    await Size.destroy({
      where: {
        id: id,
      },
    });
    req.flash("success", "Xóa kích thước thành công");
    res.redirect("/admin/categories");
  },
};
