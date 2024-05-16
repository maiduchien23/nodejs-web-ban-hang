const { header } = require("express-validator");

module.exports = {
  userColumnFile: [
    {
      header: "STT",
      key: "stt",
    },
    {
      header: "Tên",
      key: "name",
    },
    {
      header: "Email",
      key: "email",
    },
    {
      header: "SĐT",
      key: "phone",
    },
    {
      header: "Địa chỉ",
      key: "address",
    },
  ],
  productColumnFile: [
    {
      header: "STT",
      key: "stt",
    },
    {
      header: "Tên sản phẩm",
      key: "name",
    },

    {
      header: "Mô tả",
      key: "description",
    },

    {
      header: "Giá",
      key: "price",
    },
    {
      header: "Số lượng",
      key: "quantityAvailable",
    },
    {
      header: "Danh mục",
      key: "categoryId",
    },
    {
      header: "Thương hiệu",
      key: "brandId",
    },
    {
      header: "Ngày tạo",
      key: "createdAt",
    },
  ],
  orderColumnFile: [
    {
      header: "STT",
      key: "stt",
    },
    {
      header: "Mã đơn hàng",
      key: "orderCode",
    },
    {
      header: "Khách hàng",
      key: "userId",
    },
    {
      header: "Số điện thoại",
      key: "phone",
    },
    {
      header: "Tổng giá đơn hàng",
      key: "totalAmount",
    },
    {
      header: "Trạng thái đơn hàng",
      key: "status",
    },
    {
      header: "Tỉnh thành nhận hàng",
      key: "province",
    },
    {
      header: "Quận huyện nhận hàng",
      key: "district",
    },
    {
      header: "Xã phường nhận hàng",
      key: "ward",
    },
    {
      header: "Địa chỉ nhận hàng",
      key: "addressDetail",
    },
    {
      header: "Ngày tạo đơn hàng",
      key: "orderDate",
    },
  ],
};
