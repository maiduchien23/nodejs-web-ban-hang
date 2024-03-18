const { body } = require("express-validator");
const { Op } = require("sequelize");

const model = require("../../models/index");
const User = model.User;

const userValidate = () => {
  const middleware = [
    body("name", "Tên người dùng không được để trống").notEmpty(),
    body("name", "Tên người dùng nên có 2 - 30 ký tự").isLength({
      min: 2,
      max: 30,
    }),
    body("email", "Email không được để trống").notEmpty(),
    body("email").custom(async (value, { req }) => {
      const { id } = req.params;

      const user = await User.findOne({
        where: {
          email: value,
          [Op.not]: [{ id: id }],
        },
      });

      if (user) {
        throw new Error("Email đã tồn tại");
      }

      return true; // Ensure to return true if the validation passes
    }),
    body("email", "Email không hợp lệ").isEmail(),
    body("phone", "Số điện thoại không được để trống").notEmpty(),
    body("phone", "Số điện thoại không hợp lệ").isLength({
      min: 10,
      max: 11,
    }),
    body("phone", "Số điện thoại không hợp lệ").isMobilePhone("vi-VN"),
    body("address", "Địa chỉ không được để trống").notEmpty(),
  ];

  // Check if middleware is an array of functions
  if (
    !Array.isArray(middleware) ||
    middleware.some((fn) => typeof fn !== "function")
  ) {
    throw new Error(
      "userValidate middleware must return an array of functions"
    );
  }

  return middleware;
};

module.exports = userValidate;
