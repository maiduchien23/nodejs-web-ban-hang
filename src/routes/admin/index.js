const express = require("express");
const router = express.Router();
const dashboardController = require("../../http/controller/admin/dashboard.Controller");
const authMiddleware = require("../../http/middlewares/auth.Middleware");

router.get("/", authMiddleware, dashboardController.index);

module.exports = router;
