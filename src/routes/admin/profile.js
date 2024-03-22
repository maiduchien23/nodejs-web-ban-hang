var express = require("express");
var router = express.Router();

const ProfileController = require("../../http/controller/admin/profile.Controller");
const ProfileUpdateValidate = require("../../http/middlewares/profileUpdate.Middleware");

router.get("/", ProfileController.profile);
router.get("/update", ProfileController.edit);
router.post("/update", ProfileUpdateValidate(), ProfileController.update);

module.exports = router;
