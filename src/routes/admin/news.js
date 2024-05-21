var express = require("express");
var router = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const NewController = require("../../http/controller/admin/new.Controller");
const newsValidate = require("../../http/middlewares/news.Validate.");
const newsUpdateValidate = require("../../http/middlewares/news.UpdateValidate");

router.get("/", NewController.index);
router.post("/", NewController.index);

router.get("/add", NewController.add);
router.post("/add", newsValidate(), NewController.store);

router.get("/edit/:id", NewController.edit);
router.post("/edit/:id", newsUpdateValidate(), NewController.update);

router.delete("/delete/:id", NewController.destroy);

module.exports = router;
