const moment = require("moment");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
const constants = require("../../../constants/index");
const exportFile = require("../../../utils/exportFile");
const importFile = require("../../../utils/importFile");
const { getPaginateUrl } = require("../../../utils/url");
const permissionUtils = require("../../../utils/permissionUtils");
const validate = require("../../../utils/validate");
const models = require("../../../models/index");
const {
  Product,
  Category,
  Brand,
  ProductVariant,
  ProductImage,
  ProductAttribute,
  Permission,
} = models;

const moduleName = "Sản phẩm";

module.exports = {
  index: async (req, res) => {
    const title = "Danh sách sản phẩm";
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
    const totalCountObj = await Product.findAndCountAll({
      include: [
        {
          model: Category,
        },
        {
          model: Brand,
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
    const products = await Product.findAll({
      include: [
        {
          model: Category,
        },
        {
          model: Brand,
        },
      ],
      where: filters,
      limit: +recordNumber,
      offset: offset,
    });

    const permissionUser = await permissionUtils.roleUser(req);

    res.render("admin/product/index", {
      req,
      products,
      moment,
      title,
      moduleName,
      permissionUser,
      permissionUtils,
      totalPage,
      page,
      recordNumber,
      userName,
    });
  },

  add: async (req, res) => {
    const title = "Thêm sản phẩm";
    const userName = req.user.name;
    const errors = req.flash("errors");
    const success = req.flash("success");

    const categories = await Category.findAll();
    const brands = await Brand.findAll();

    const permissionUser = await permissionUtils.roleUser(req);

    res.render("admin/product/add", {
      title,
      moduleName,
      errors,
      success,
      validate,
      permissionUser,
      permissionUtils,
      categories,
      brands,
      userName,
    });
  },

  store: async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const {
        name,
        description,
        originalPrice,
        discountPrice,
        price,
        quantityAvailable,
        sold,
        categoryId,
        brandId,
        otherDetails,
        group,
        productUrl,
        metaTitle,
        metaDescription,
        metaKeywords,
      } = req.body;

      await Product.create({
        name,
        description,
        originalPrice,
        discountPrice,
        price,
        quantityAvailable,
        sold,
        categoryId,
        brandId,
        otherDetails,
        group,
        url: productUrl,
        metaTitle,
        metaDescription,
        metaKeywords,
      });

      req.flash("success", "Thêm sản phẩm thành công");
      return res.redirect("/admin/products");
    }
    req.flash("errors", result.errors);
    res.redirect("/admin/products/add");
  },

  edit: async (req, res) => {
    const { id } = req.params;
    const userName = req.user.name;
    const errors = req.flash("errors");
    const title = "Sửa sản phẩm";
    const success = req.flash("success");

    const product = await Product.findByPk(id);
    const categories = await Category.findAll();
    const brands = await Brand.findAll();

    const permissionUser = await permissionUtils.roleUser(req);

    res.render("admin/product/edit", {
      product,
      title,
      errors,
      success,
      categories,
      validate,
      permissionUser,
      permissionUtils,
      brands,
      moduleName,
      userName,
    });
  },

  update: async (req, res) => {
    const { id } = req.params;

    const result = validationResult(req);
    if (result.isEmpty()) {
      const {
        name,
        description,
        originalPrice,
        discountPrice,
        price,
        quantityAvailable,
        sold,
        categoryId,
        brandId,
        otherDetails,
        group,
        productUrl,
        metaTitle,
        metaDescription,
        metaKeywords,
      } = req.body;

      await Product.update(
        {
          name,
          description,
          originalPrice,
          discountPrice,
          price,
          quantityAvailable,
          sold,
          categoryId,
          brandId,
          otherDetails,
          group,
          url: productUrl,
          metaTitle,
          metaDescription,
          metaKeywords,
        },
        {
          where: {
            id: id,
          },
        }
      );

      req.flash("success", "Cập nhật sản phẩm thành công");
      return res.redirect(`/admin/products/edit/${id}`);
    }

    req.flash("errors", result.errors);
    res.redirect(`/admin/products/edit/${id}`);
  },

  destroy: async (req, res) => {
    const { id } = req.params;

    await Product.destroy({
      where: {
        id: id,
      },
    });

    req.flash("success", "Xóa sản phẩm thành công");
    res.redirect("/admin/products");
  },

  export: async (req, res) => {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
        },
        {
          model: Brand,
        },
      ],
    });
    const columns = constants.productColumnFile;
    const date = new Date().getTime();
    const fileName = `product-${date}.xlsx`;
    exportFile(res, products, "Product", fileName, columns);
  },

  import: async (req, res) => {
    const title = "Import File";
    const userName = req.user.name;

    const permissionUser = await permissionUtils.roleUser(req);

    res.render("admin/product/import", {
      title,
      moduleName,
      permissionUser,
      permissionUtils,
      userName,
    });
  },

  handleImport: async (req, res) => {
    const file = req.file;

    try {
      const data = await importFile(file.path);

      for (let i = 0; i < data.length; i++) {
        const product = await Product.create({
          name: data[i].column_1,
          description: data[i].column_2,
          originalPrice: data[i].column_3,
          discountPrice: data[i].column_4,
          price: data[i].column_5,
          quantityAvailable: data[i].column_6,
          sold: data[i].column_7,
          categoryId: data[i].column_8,
          brandId: data[i].column_9,
          otherDetails: data[i].column_10,
          group: data[i].column_11,
          url: data[i].column_12,
          metaTitle: data[i].column_13,
          metaDescription: data[i].column_14,
          metaKeywords: data[i].column_15,
          createdBy: req.user.id,
          updatedBy: req.user.id,
        });
      }

      req.flash("success", "Import thành công ");
      res.redirect("/admin/products");
    } catch (error) {
      console.log("Error importing file:", error);
      req.flash("errors", "Đã xảy ra lỗi khi import file. Vui loại thử lại");
      res.redirect("/admin/products/import");
    }
  },
};
