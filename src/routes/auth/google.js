var express = require("express");
var router = express.Router();
const passport = require("passport");

const AuthController = require("../../http/controller/auth/auth.Controller");

router.get(
  "/google/redirect",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/admin",
    failureRedirect: "/auth/login",
    failureMessage: true,
  }),
  AuthController.loginGoogle
);

module.exports = router;
