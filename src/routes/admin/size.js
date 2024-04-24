const express = require("express");
const router = express.Router();

const sizeController = require("../../http/controller/admin/size.Controller");

router.get("/", sizeController.index);

router.get("/add", sizeController.add);
router.post("/add", sizeController.store);

router.get("/edit/:id", sizeController.edit);
router.patch("/edit/:id", sizeController.update);

router.delete("/delete/:id", sizeController.destroy);

module.exports = router;
