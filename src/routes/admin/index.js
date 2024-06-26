var express = require("express");
var router = express.Router();

const DashboardController = require("../../http/controller/admin/dashboard.Controller");
const ProfileController = require("../../http/controller/admin/profile.Controller");
const ChangePasswordValidate = require("../../http/middlewares/changePassword.Middleware");
const SettingController = require("../../http/controller/admin/setting.Controller");

const profileRouter = require("./profile");
const userRouter = require("./user");
const roleRouter = require("./role");
const productRouter = require("./product");
const categoryRouter = require("./category");
const brandRouter = require("./brand");
const colorRouter = require("./color");
const sizeRouter = require("./size");
const productVariantRouter = require("./productVariant");
const comboRouter = require("./combo");
const orderRouter = require("./order");
const newRouter = require("./news");

router.get("/", DashboardController.index);
router.get("/changePassword", ProfileController.changePassword);
router.post(
  "/changePassword",
  ChangePasswordValidate(),
  ProfileController.handleChangePassword
);
router.get("/setting", SettingController.index);
router.use("/profile", profileRouter);
router.use("/users", userRouter);
router.use("/roles", roleRouter);
router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/brands", brandRouter);
router.use("/colors", colorRouter);
router.use("/sizes", sizeRouter);
router.use("/productVariants", productVariantRouter);
router.use("/combos", comboRouter);
router.use("/orders", orderRouter);
router.use("/news", newRouter);

module.exports = router;
