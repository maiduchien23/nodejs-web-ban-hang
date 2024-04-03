const { body } = require("express-validator");
const { Op } = require("sequelize");

const model = require("../../models/index");
const Product = model.Product;

const productUpdateValidate = () => {
  const middleware = [
    body("name", "Tên sản phẩm không được để trống").notEmpty(),
    body("name", "Tên sản phẩm nên có độ dài từ 2 đến 255 ký tự").isLength({
      min: 2,
      max: 255,
    }),
    body("description", "Mô tả không được để trống").notEmpty(),

    body("price", "Giá không được để trống").notEmpty(),
    body("price", "Giá phải là số").isNumeric(),

    body("categoryId", "Danh mục không được để trống").notEmpty(),
    body("categoryId", "Danh mục phải là số").isNumeric(),
    body("brandId", "Thương hiệu không được để trống").notEmpty(),
    body("brandId", "Thương hiệu phải là số").isNumeric(),
  ];

  // Check if middleware is an array of functions
  if (
    !Array.isArray(middleware) ||
    middleware.some((fn) => typeof fn !== "function")
  ) {
    throw new Error(
      "productUpdateValidate middleware must return an array of functions"
    );
  }

  return middleware;
};

module.exports = productUpdateValidate;
