const express = require("express");
const router = express.Router();
const authController = require("../../http/controller/auth/auth.Controller");
const passport = require("passport");

const isLogin = (req, res, next) => {
  if (req.user) {
    res.redirect("/");
  }
  next();
};

/* Authentication Routes */
router.get("/login", isLogin, authController.login);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/auth/login",
    failureFlash: true,
  }),
  authController.handleLogin
);
router.get("/register", isLogin, authController.register);
router.post("/register", authController.handleRegister);

router.get("/logout", authController.logout);

module.exports = router;
