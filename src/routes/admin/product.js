var express = require("express");
var router = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const directory = "./public/uploads/file";

    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
    cb(null, directory);
  },
  filename: function (req, file, cb) {
    const dateNow = Date.now();
    cb(null, `Product_${dateNow}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });
const ProductController = require("../../http/controller/admin/product.Controller");
const ProductValidate = require("../../http/middlewares/product.Validate");
const ProductUpdateValidate = require("../../http/middlewares/product.UpdateValidate");
const ProductVariantController = require("../../http/controller/admin/productVariant.Controller");

router.get("/", ProductController.index);
router.post("/", ProductController.index);

router.get("/add", ProductController.add);
router.post(
  "/add",
  upload.single("image"),
  ProductValidate(),
  ProductController.store
);

router.get("/edit/:id", ProductController.edit);
router.post(
  "/edit/:id",
  upload.single("newImage"),
  ProductUpdateValidate(),
  ProductController.update
);

router.delete("/delete/:id", ProductController.destroy);

router.post("/export", ProductController.export);

router.get("/import", ProductController.import);
router.post(
  "/import",
  upload.single("fileProduct"),
  ProductController.handleImport
);
router.get("/variants/:productId", ProductVariantController.getProductVariants);

module.exports = router;
