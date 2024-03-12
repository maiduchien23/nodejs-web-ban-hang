const bcrypt = require("bcrypt");
const passport = require("passport");
const model = require("../../../models/index");
const User = model.User;

module.exports = {
  login: (req, res) => {
    res.render("auth/login", {
      layout: "layouts/auth.layout.ejs",
      message: req.flash("error_msg"),
    });
  },

  register: (req, res) => {
    res.render("auth/register", {
      layout: "layouts/auth.layout.ejs",
      message: req.flash("error_msg"),
    });
  },

  handleLogin: async (req, res) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect("/auth/login");
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.redirect("/admin");
      });
    })(req, res, next);
  },

  handleRegister: async (req, res) => {
    const { name, password, email, address, phone_number } = req.body;

    try {
      const saltRounds = 10;
      const hash = await bcrypt.hash(password, saltRounds);

      const data = await User.create({
        name,
        password: hash,
        email,
        address,
        phone_number,
        first_login: 0,
        created_at: new Date(),
        updated_at: new Date(),
      });

      if (data) {
        req.flash("msg", "Đăng ký tài khoản thành công");
        res.redirect("/auth/login");
      } else {
        req.flash("msg", "Vui lòng kiểm tra lại thông tin");
        res.redirect("/auth/register");
      }
    } catch (error) {
      console.error("Registration error:", error);
      req.flash("msg", "Lỗi xảy ra trong quá trình đăng ký");
      res.redirect("/auth/register");
    }
  },

  logout: (req, res, next) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/auth/login");
    });
  },
};
