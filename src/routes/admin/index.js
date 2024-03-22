var express = require("express");
var router = express.Router();

const DashboardController = require("../../http/controller/admin/dashboard.Controller");
const ProfileController = require("../../http/controller/admin/profile.Controller");
const ChangePasswordValidate = require("../../http/middlewares/changePassword.Middleware");

const profileRouter = require("./profile");

router.get("/", DashboardController.index);
router.get("/changePassword", ProfileController.changePassword);
router.post(
  "/changePassword",
  ChangePasswordValidate(),
  ProfileController.handleChangePassword
);

router.use("/profile", profileRouter);

module.exports = router;
