var express = require("express");
var router = express.Router();

const HomeController = require("../../http/controller/products/home.Controller");
/* GET users listing. */
router.get("/", HomeController.index);

module.exports = router;
