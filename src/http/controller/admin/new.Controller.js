const moment = require("moment");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
const { getPaginateUrl } = require("../../../utils/url");
const permissionUtils = require("../../../utils/permissionUtils");
const validate = require("../../../utils/validate");
const model = require("../../../models/index");
const News = model.News;

const moduleName = "Tin tức";

module.exports = {
  index: async (req, res) => {
    const title = "Danh sách tin tức";
    const userName = req.user.name;
    const filters = {};

    let { keyword, page, recordNumber } = req.query;
    if (!recordNumber) {
      recordNumber = 5;
    }

    if (keyword) {
      filters[Op.or] = [
        {
          title: {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          content: {
            [Op.like]: `%${keyword}%`,
          },
        },
      ];
    }

    // Lấy tổng số bản ghi
    const totalCountObj = await News.findAndCountAll({
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
    const news = await News.findAll({
      where: filters,
      limit: +recordNumber,
      offset: offset,
    });

    const permissionUser = await permissionUtils.roleUser(req);

    res.render("admin/news/index", {
      req,
      news,
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
    const title = "Thêm tin tức";
    const userName = req.user.name;
    const errors = req.flash("errors");
    const success = req.flash("success");

    const permissionUser = await permissionUtils.roleUser(req);

    res.render("admin/news/add", {
      title,
      moduleName,
      errors,
      success,
      validate,
      permissionUser,
      permissionUtils,
      userName,
    });
  },

  store: async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const {
        title,
        content,
        author,
        publishDate,
        productUrl,
        metaTitle,
        metaDescription,
        metaKeywords,
      } = req.body;

      await News.create({
        title,
        content,
        author,
        publishDate,
        productUrl,
        metaTitle,
        metaDescription,
        metaKeywords,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      req.flash("success", "Thêm tin tức thành công");
      return res.redirect("/admin/news");
    }
    req.flash("errors", result.errors);
    res.redirect("/admin/news/add");
  },

  edit: async (req, res) => {
    try {
      const { id } = req.params;
      const news = await News.findByPk(id);
      if (!news) {
        req.flash("errors", "Không tìm thấy tin tức");
        return res.redirect("/admin/news");
      }

      const userName = req.user.name;
      const errors = req.flash("errors");
      const title = "Sửa tin tức";
      const success = req.flash("success");

      const permissionUser = await permissionUtils.roleUser(req);

      res.render("admin/news/edit", {
        news,
        title,
        errors,
        success,
        validate,
        permissionUser,
        permissionUtils,
        moduleName,
        userName,
      });
    } catch (error) {
      console.log("Error editing news:", error);
      req.flash(
        "errors",
        "Đã xảy ra lỗi khi chỉnh sửa tin tức. Vui lòng thử lại sau"
      );
      res.redirect("/admin/news");
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;

      const result = validationResult(req);
      if (!result.isEmpty()) {
        req.flash("errors", result.errors);
        return res.redirect(`/admin/news/edit/${id}`);
      }

      const {
        title,
        content,
        author,
        publishDate,
        productUrl,
        metaTitle,
        metaDescription,
        metaKeywords,
      } = req.body;

      const updatedNews = await News.update(
        {
          title,
          content,
          author,
          publishDate,
          productUrl,
          metaTitle,
          metaDescription,
          metaKeywords,
          updatedAt: new Date(),
        },
        {
          where: { id: id },
        }
      );

      if (!updatedNews) {
        req.flash("errors", "Không thể cập nhật tin tức");
        return res.redirect(`/admin/news/edit/${id}`);
      }

      req.flash("success", "Cập nhật tin tức thành công");
      return res.redirect(`/admin/news/edit/${id}`);
    } catch (error) {
      console.log("Error updating news:", error);
      req.flash(
        "errors",
        "Đã xảy ra lỗi khi cập nhật tin tức. Vui lòng thử lại sau"
      );
      res.redirect(`/admin/news/edit/${id}`);
    }
  },

  destroy: async (req, res) => {
    const { id } = req.params;

    await News.destroy({
      where: {
        id: id,
      },
    });

    req.flash("success", "Xóa tin tức thành công");
    res.redirect("/admin/news");
  },
};
