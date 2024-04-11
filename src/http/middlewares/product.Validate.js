const { body } = require("express-validator");
const { Op } = require("sequelize");

const model = require("../../models/index");
const Product = model.Product;

module.exports = () => {
  return [
    body("name", "Tên sản phẩm không được để trống").notEmpty(),
    body("name", "Tên sản phẩm nên có độ dài từ 2 đến 255 ký tự").isLength({
      min: 2,
      max: 255,
    }),
    body("description", "Mô tả không được để trống").notEmpty(),

    body("price", "Giá không được để trống").notEmpty(),
    body("price", "Giá phải là số").isNumeric(),
    body("price", "Giá không được là số âm").custom((value) => {
      if (value < 0) {
        throw new Error("Giá không được là số âm");
      }
      return true;
    }),

    body("quantityAvailable", "Số lượng phải là số").isNumeric(),
    body("quantityAvailable", "Số lượng không được là số âm").custom(
      (value) => {
        if (value < 0) {
          throw new Error("Số lượng không được là số âm");
        }
        return true;
      }
    ),

    body("categoryId", "Danh mục không được để trống").notEmpty(),
    body("categoryId", "Danh mục phải là số").isNumeric(),
    body("brandId", "Thương hiệu không được để trống").notEmpty(),
    body("brandId", "Thương hiệu phải là số").isNumeric(),
  ];
};
