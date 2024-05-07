const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
const model = require("../../../models/index");
const { getPaginateUrl } = require("../../../utils/url");
const Color = model.ProductColor;
const permissionUtils = require("../../../utils/permissionUtils");

const moduleName = "Danh mục";

module.exports = {
  index: async (req, res) => {
    const title = "Danh sách danh mục";
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
    const totalCountObj = await Color.findAndCountAll({
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
    const colors = await Color.findAll({
      where: filters,
      limit: +recordNumber,
      offset: offset,
    });

    const permissionUser = await permissionUtils.roleUser(req);

    res.render("admin/color/index", {
      req,
      colors,
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
    const title = "Thêm màu";
    const userName = req.user.name;
    const errors = req.flash("errors");
    const success = req.flash("success");

    const permissionUser = await permissionUtils.roleUser(req);

    res.render("admin/color/add", {
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

      await Color.create({
        name: name,
      });

      req.flash("success", "Thêm màu thành công");
      return res.redirect("/admin/categories");
    }

    req.flash("errors", result.errors);
    res.redirect("/admin/colors/add");
  },

  edit: async (req, res) => {
    const { id } = req.params;
    const userName = req.user.name;
    const errors = req.flash("errors");
    const title = "Sửa màu";
    const success = req.flash("success");

    const color = await Color.findOne({
      where: {
        id: id,
      },
    });

    const permissionUser = await permissionUtils.roleUser(req);

    res.render("admin/color/edit", {
      color,
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
      await Color.update(
        {
          name: name,
        },
        {
          where: {
            id: id,
          },
        }
      );
      req.flash("success", "Cập nhập màu thành công");
      return res.redirect(`/admin/colors/edit/${id}`);
    }

    req.flash("errors", result.errors);
    res.redirect(`/admin/colors/edit/${id}`);
  },

  destroy: async (req, res) => {
    const { id } = req.params;
    await Color.destroy({
      where: {
        id: id,
      },
    });
    req.flash("success", "Xóa màu thành công");
    res.redirect("/admin/categories");
  },
};
