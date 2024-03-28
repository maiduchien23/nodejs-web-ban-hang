var express = require("express");
var router = express.Router();

const RoleController = require("../../http/controller/admin/role.Controller");
const RoleValidate = require("../../http/middlewares/role.Validate");
const RoleUpdateValidate = require("../../http/middlewares/role.UpdateValidate");

router.get("/", RoleController.index);

router.get("/add", RoleController.add);
router.post("/add", RoleValidate(), RoleController.create);

router.get("/edit/:id", RoleController.edit);
router.patch("/edit/:id", RoleUpdateValidate(), RoleController.update);

router.delete("/delete/:id", RoleController.destroy);

module.exports = router;
