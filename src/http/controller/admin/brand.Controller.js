const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
const model = require("../../../models/index");
const { getPaginateUrl } = require("../../../utils/url");
const Brand = model.Brand;
const permissionUtils = require("../../../utils/permissionUtils");

const moduleName = "Thương hiệu";

module.exports = {
  index: async (req, res) => {
    const title = "Danh sách thương hiệu";
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
    const totalCountObj = await Brand.findAndCountAll({
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
    const brands = await Brand.findAll({
      where: filters,
      limit: +recordNumber,
      offset: offset,
    });

    const permissionUser = await permissionUtils.roleUser(req);

    res.render("admin/brand/index", {
      req,
      brands,
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
    const title = "Thêm thương hiệu";
    const userName = req.user.name;
    const errors = req.flash("errors");
    const success = req.flash("success");

    const permissionUser = await permissionUtils.roleUser(req);

    res.render("admin/brand/add", {
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

      await Brand.create({
        name: name,
      });

      req.flash("success", "Thêm danh mục thành công");
      return res.redirect("/admin/brands");
    }

    req.flash("errors", result.errors);
    res.redirect("/admin/brands/add");
  },

  edit: async (req, res) => {
    const { id } = req.params;
    const userName = req.user.name;
    const errors = req.flash("errors");
    const title = "Sửa thương hiệu";
    const success = req.flash("success");

    const brand = await Brand.findOne({
      where: {
        id: id,
      },
    });

    const permissionUser = await permissionUtils.roleUser(req);

    res.render("admin/brand/edit", {
      brand,
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
      await Brand.update(
        {
          name: name,
        },
        {
          where: {
            id: id,
          },
        }
      );
      req.flash("success", "Cập nhập danh mục thành công");
      return res.redirect(`/admin/brands/edit/${id}`);
    }

    req.flash("errors", result.errors);
    res.redirect(`/admin/brands/edit/${id}`);
  },

  destroy: async (req, res) => {
    const { id } = req.params;
    await Brand.destroy({
      where: {
        id: id,
      },
    });
    req.flash("success", "Xóa danh mục thành công");
    res.redirect("/admin/brands");
  },
};
