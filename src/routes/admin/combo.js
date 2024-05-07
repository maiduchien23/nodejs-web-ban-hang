const express = require("express");
const router = express.Router();
const comboController = require("../../http/controller/admin/combo.Controller");

router.get("/", comboController.index);

router.get("/add", comboController.add);
router.post("/add", comboController.store);

router.get("/edit/:id", comboController.edit);
router.post("/edit/:id", comboController.update);

router.delete("/delete/:id", comboController.destroy);

module.exports = router;
