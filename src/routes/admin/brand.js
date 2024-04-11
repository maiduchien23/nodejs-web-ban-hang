const express = require("express");
const router = express.Router();

const brandController = require("../../http/controller/admin/brand.Controller");

router.get("/", brandController.index);

router.get("/add", brandController.add);
router.post("/add", brandController.store);

router.get("/edit/:id", brandController.edit);
router.patch("/edit/:id", brandController.update);

router.delete("/delete/:id", brandController.destroy);

module.exports = router;
