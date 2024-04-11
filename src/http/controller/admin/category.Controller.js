const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
const model = require("../../../models/index");
const Category = model.Category;
const permissionUtils = require("../../../utils/permissionUtils");
const { getPaginateUrl } = require("../../../utils/url");

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
    const totalCountObj = await Category.findAndCountAll({
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
    const categories = await Category.findAll({
      where: filters,
      limit: +recordNumber,
      offset: offset,
    });

    const permissionUser = await permissionUtils.roleUser(req);

    res.render("admin/category/index", {
      req,
      categories,
      title,
      moduleName,
      totalPage,
      totalCount,
      permissionUser,
      permissionUtils,
      getPaginateUrl,
      page,
      recordNumber,
      userName,
    });
  },

  add: async (req, res) => {
    const title = "Thêm danh mục";
    const userName = req.user.name;
    const errors = req.flash("errors");
    const success = req.flash("success");

    const permissionUser = await permissionUtils.roleUser(req);

    res.render("admin/category/add", {
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
      const { name, priority } = req.body;

      await Category.create({
        name: name,
        priority: priority,
        createdBy: req.user.id,
        updatedBy: req.user.id,
      });

      req.flash("success", "Thêm danh mục thành công");
      return res.redirect("/admin/categories");
    }

    req.flash("errors", result.errors);
    res.redirect("/admin/categories/add");
  },

  edit: async (req, res) => {
    const { id } = req.params;
    const userName = req.user.name;
    const errors = req.flash("errors");
    const title = "Sửa danh mục";
    const success = req.flash("success");

    const category = await Category.findOne({
      where: {
        id: id,
      },
    });

    const permissionUser = await permissionUtils.roleUser(req);

    res.render("admin/category/edit", {
      category,
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
    const { name, priority } = req.body;

    const result = validationResult(req);
    if (result.isEmpty()) {
      await Category.update(
        {
          name: name,
          priority: priority,
          updatedBy: req.user.id,
        },
        {
          where: {
            id: id,
          },
        }
      );
      req.flash("success", "Cập nhập danh mục thành công");
      return res.redirect(`/admin/categories/edit/${id}`);
    }

    req.flash("errors", result.errors);
    res.redirect(`/admin/categories/edit/${id}`);
  },

  destroy: async (req, res) => {
    const { id } = req.params;
    await Category.destroy({
      where: {
        id: id,
      },
    });
    req.flash("success", "Xóa danh mục thành công");
    res.redirect("/admin/categories");
  },
};
