// orderUpdateValidate.js

const { body } = require("express-validator");

const orderUpdateValidate = () => {
  const middleware = [
    body("userId", "User ID không được để trống").notEmpty(),
    body("totalAmount", "Tổng số tiền không được để trống").notEmpty(),
    body("totalAmount", "Tổng số tiền phải là số").isNumeric(),
    body("totalAmount", "Tổng số tiền không được là số âm").custom((value) => {
      if (value < 0) {
        throw new Error("Tổng số tiền không được là số âm");
      }
      return true;
    }),
    body("status", "Trạng thái không được để trống").notEmpty(),
    body("orderDate", "Ngày đặt hàng không được để trống").notEmpty(),
    body("phone", "Số điện thoại không được để trống").notEmpty(),
    body("phone", "Số điện thoại không đúng định dạng").matches(/^\d{10,11}$/),
    body("province", "Tỉnh/Thành phố không được để trống").notEmpty(),
    body("district", "Quận/Huyện không được để trống").notEmpty(),
    body("ward", "Phường/Xã không được để trống").notEmpty(),
    body("addressDetail", "Địa chỉ chi tiết không được để trống").notEmpty(),
    body("orderItems", "Danh sách sản phẩm không được để trống").notEmpty(),
    body(
      "orderQuantities",
      "Danh sách số lượng không được để trống"
    ).notEmpty(),
    body("orderPricePerUnits", "Danh sách giá không được để trống").notEmpty(),
  ];

  // Kiểm tra xem middleware có phải là mảng các hàm không
  if (
    !Array.isArray(middleware) ||
    middleware.some((fn) => typeof fn !== "function")
  ) {
    throw new Error(
      "orderUpdateValidate middleware must return an array of functions"
    );
  }

  return middleware;
};

module.exports = orderUpdateValidate;
