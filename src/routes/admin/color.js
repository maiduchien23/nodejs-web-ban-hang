const express = require("express");
const router = express.Router();

const colorController = require("../../http/controller/admin/color.Controller");

router.get("/", colorController.index);

router.get("/add", colorController.add);
router.post("/add", colorController.store);

router.get("/edit/:id", colorController.edit);
router.patch("/edit/:id", colorController.update);

router.delete("/delete/:id", colorController.destroy);

module.exports = router;
