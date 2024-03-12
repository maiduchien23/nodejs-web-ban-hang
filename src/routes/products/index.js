var express = require("express");
var router = express.Router();
const homeController = require("../../http/controller/products/home.Controller");
/* GET home page. */
router.get("/", homeController.index);

module.exports = router;
