var express = require("express");
var router = express.Router();

const productController = require("../../http/controller/productController");
/* GET home page. */

router.get("/", productController.index);

module.exports = router;
