const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("./public/uploads/file")) {
      fs.mkdirSync("./public/uploads/file");
    }
    cb(null, "./public/uploads/file/");
  },
  filename: function (req, file, cb) {
    const dateNow = Date.now();
    cb(null, `Order_Admin_${dateNow}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });
const orderController = require("../../http/controller/admin/order.Controller");
const OrderValidate = require("../../http/middlewares/order.Validate");
const OrderUpdateValidate = require("../../http/middlewares/order.UpdateValidate");

// Định nghĩa các route liên quan đến đơn hàng
router.get("/", orderController.index);
router.post("/", orderController.index);

router.get("/add", orderController.add);
router.post("/add", OrderValidate(), orderController.store);

router.get("/edit/:id", orderController.edit);
router.post("/edit/:id", OrderUpdateValidate(), orderController.update);

router.get("/orderDetail/:id", orderController.orderDetail);

router.delete("/delete/:id", orderController.destroy);

router.post("/export", orderController.export);

router.get("/import", orderController.import);
router.post(
  "/import",
  upload.single("fileOrder"),
  orderController.handleImport
);

module.exports = router;
