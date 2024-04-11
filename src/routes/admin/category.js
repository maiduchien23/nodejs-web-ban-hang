const express = require("express");
const router = express.Router();

const categoryController = require("../../http/controller/admin/category.Controller");

router.get("/", categoryController.index);

router.get("/add", categoryController.add);
router.post("/add", categoryController.store);

router.get("/edit/:id", categoryController.edit);
router.patch("/edit/:id", categoryController.update);

router.delete("/delete/:id", categoryController.destroy);

module.exports = router;
