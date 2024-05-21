const { body } = require("express-validator");

module.exports = () => {
  return [
    body("title", "Tiêu đề không được để trống").notEmpty(),
    body("title", "Tiêu đề nên có độ dài từ 2 đến 255 ký tự").isLength({
      min: 2,
      max: 255,
    }),
    body("content", "Nội dung không được để trống").notEmpty(),
    body("author", "Tác giả không được để trống").notEmpty(),
    body("publishDate", "Ngày xuất bản không được để trống").notEmpty(),
    body("publishDate", "Ngày xuất bản không hợp lệ").isISO8601(),
    body("productUrl", "URL sản phẩm không hợp lệ").optional().isURL(),
    body("metaTitle", "Tiêu đề meta không hợp lệ").optional().isLength({
      max: 255,
    }),
    body("metaDescription", "Mô tả meta không hợp lệ").optional().isLength({
      max: 255,
    }),
    body("metaKeywords", "Từ khóa meta không hợp lệ").optional().isLength({
      max: 255,
    }),
  ];
};
