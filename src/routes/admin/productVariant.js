const express = require("express");
const router = express.Router();

const productVariantController = require("../../http/controller/admin/productVariant.Controller");

router.get("/", productVariantController.index);

router.get("/add", productVariantController.add);
router.post("/add", productVariantController.store);

router.get("/edit/:id", productVariantController.edit);
router.patch("/edit/:id", productVariantController.update);

router.delete("/delete/:id", productVariantController.destroy);

router.get("/variants/:productId", productVariantController.getProductVariants);

module.exports = router;
