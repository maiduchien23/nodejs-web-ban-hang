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
  ProductColor,
  ProductSize,
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
        {
          model: ProductImage,
          attributes: ["imageUrl"],
          limit: 1,
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
      getPaginateUrl,
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
    const productImages = await ProductImage.findAll();

    const permissionUser = await permissionUtils.roleUser(req);

    res.render("admin/product/add", {
      title,
      moduleName,
      errors,
      success,
      productImages,
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
        categoryId,
        brandId,
        otherDetails,
        group,
        url,
        metaTitle,
        metaDescription,
        metaKeywords,
      } = req.body;

      const imageUrl = req.file ? `/uploads/file/${req.file.filename}` : null;

      const updateProduct = await Product.create({
        name,
        description,
        originalPrice,
        discountPrice,
        price,
        quantityAvailable,
        categoryId,
        brandId,
        otherDetails,
        group,
        url,
        metaTitle,
        metaDescription,
        metaKeywords,
        imageUrl,
      });

      await ProductImage.create({
        productId: updateProduct.id,
        imageUrl: imageUrl,
      });

      req.flash("success", "Thêm sản phẩm thành công");
      return res.redirect("/admin/products");
    }
    req.flash("errors", result.errors);
    res.redirect("/admin/products/add");
  },

  edit: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      if (!product) {
        // Xử lý khi không tìm thấy sản phẩm
        req.flash("errors", "Không tìm thấy sản phẩm");
        return res.redirect("/admin/products");
      }

      const userName = req.user.name;
      const errors = req.flash("errors");
      const title = "Sửa sản phẩm";
      const success = req.flash("success");

      const categories = await Category.findAll();
      const brands = await Brand.findAll();
      const productImages = await ProductImage.findAll({
        where: {
          productId: id,
        },
      });
      const productVariant = await ProductVariant.findByPk(id);
      const colors = await ProductColor.findAll();
      const sizes = await ProductSize.findAll();

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
        productImages,
        brands,
        moduleName,
        userName,
        productVariant,
        colors,
        sizes,
      });
    } catch (error) {
      console.log("Error editing product:", error);
      req.flash(
        "errors",
        "Đã xảy ra lỗi khi chỉnh sửa sản phẩm. Vui lòng thử lại sau"
      );
      res.redirect("/admin/products");
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;

      const result = validationResult(req);
      if (!result.isEmpty()) {
        req.flash("errors", result.errors);
        return res.redirect(`/admin/products/edit/${id}`);
      }

      const {
        name,
        description,
        originalPrice,
        discountPrice,
        price,
        quantityAvailable,
        categoryId,
        brandId,
        otherDetails,
        group,
        url,
        metaTitle,
        metaDescription,
        metaKeywords,
      } = req.body;

      const productImages = await ProductImage.findAll({
        where: {
          productId: id,
        },
      });

      let imageUrl = null;

      if (req.file) {
        const newImageUrl = `/uploads/file/${req.file.filename}`;

        if (productImages.length > 0) {
          await ProductImage.destroy({
            where: {
              productId: id,
            },
          });
        }

        await ProductImage.create({
          productId: id,
          imageUrl: newImageUrl,
        });

        productImages[0] = { imageUrl: newImageUrl };
      }

      const updatedProduct = await Product.update(
        {
          name,
          description,
          originalPrice,
          discountPrice,
          price,
          quantityAvailable,
          categoryId,
          brandId,
          otherDetails,
          group,
          url,
          metaTitle,
          metaDescription,
          metaKeywords,
          imageUrl,
          productImages,
        },
        {
          where: { id: id },
        }
      );

      if (!updatedProduct) {
        req.flash("errors", "Không thể cập nhật sản phẩm");
        return res.redirect(`/admin/products/edit/${id}`);
      }

      req.flash("success", "Cập nhật sản phẩm thành công");
      return res.redirect(`/admin/products/edit/${id}`);
    } catch (error) {
      console.log("Error updating product:", error);
      req.flash(
        "errors",
        "Đã xảy ra lỗi khi cập nhật sản phẩm. Vui lòng thử lại sau"
      );
      res.redirect(`/admin/products/edit/${id}`);
    }
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
          attributes: ["name"],
        },
        {
          model: Brand,
          attributes: ["name"],
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

    // Kiểm tra xem tệp đã được xuất trước đó hay không
    if (!file.originalname.includes("product_admin")) {
      req.flash("errors", [
        { msg: "Tệp không hợp lệ. Hãy chọn tệp đã xuất từ hệ thống." },
      ]);
      return res.redirect("/admin/products/import");
    }
    try {
      const data = await importFile(file.path);

      for (let i = 0; i < data.length; i++) {
        await Product.create({
          name: data[i].column_1,
          description: data[i].column_2,
          price: data[i].column_3,
          quantityAvailable: data[i].column_4,
          nameCategory: data[i].column_5,
          nameBrand: data[i].column_6,
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
