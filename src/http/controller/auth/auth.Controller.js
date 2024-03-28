const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const md5 = require("md5");

const JWT_SECRET = process.env.JWT_SECRET;

const SendMail = require("../../../services/SendEmail");
const FormatDate = require("../../../services/FormatDate");

const { OTP, User, RefreshToken, Type } = require("../../../models/index");

const saltRounds = 10;

module.exports = {
  login: (req, res) => {
    const message = req.flash("error");
    res.render("auth/login", {
      layout: "layouts/auth.layout.ejs",
      message,
    });
  },

  handleLogin: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        req.flash("error", "Email không tồn tại");
        return res.redirect("/auth/login");
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        req.flash("error", "Mật khẩu không chính xác");
        return res.redirect("/auth/login");
      }

      await OTP.destroy({ where: { userId: user.id } });

      const otp = Math.floor(Math.random() * 90000) + 10000;
      const timeExpires = new Date(new Date().getTime() + 60000);
      const html = "<b>Mã xác minh để đăng nhập: </b>" + otp;
      SendMail(email, "Xác minh tài khoản", html);
      await OTP.create({
        otpCode: otp,
        userId: user.id,
        expiryTime: timeExpires,
      });

      await RefreshToken.destroy({ where: { userId: user.id } });

      const token = md5(new Date() + Math.random());
      await RefreshToken.create({ token, userId: user.id });

      res.cookie("token", token, { maxAge: 900000, httpOnly: true });

      req.flash("email", email);
      return res.redirect("/auth/verification");
    } catch (error) {
      console.error("Login error:", error);
      req.flash("error", "Đã xảy ra lỗi khi đăng nhập");
      return res.redirect("/auth/login");
    }
  },

  loginFacebook: (req, res) => {
    res.redirect("/admin");
  },

  loginGoogle: (req, res) => {
    res.redirect("/admin");
  },

  verification: async (req, res) => {
    const email = req.flash("email");
    const message = req.flash("message");

    res.render("auth/verification", {
      layout: "layouts/auth.layout.ejs",
      email,
      message,
    });
  },

  handleVerification: async (req, res) => {
    const { numberOne, numberTwo, numberThree, numberFour, numberFive } =
      req.body;
    const { id } = req.user;
    const otp = `${numberOne}${numberTwo}${numberThree}${numberFour}${numberFive}`;

    const user = await OTP.findOne({
      where: {
        [Op.and]: [{ otpCode: otp }, { userId: id }],
      },
    });

    if (user) {
      const timeMoment = new Date();
      const expires = user.expiryTime;
      console.log(expires < timeMoment);
      if (expires < timeMoment) {
        req.flash("message", "Mã OTP đã hết hạn");
        req.flash("email", req.user.email);
        res.redirect("/auth/verification");
        return;
      }

      res.redirect("/admin");
      return;
    }
    req.flash("message", "Mã OTP không chính xác");
    res.redirect("/auth/verification");
  },

  logout: (req, res) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/auth/login");
    });
  },

  forgotPassword: (req, res) => {
    res.render("auth/forgotPassword", {
      layout: "layouts/auth.layout.ejs",
    });
  },

  handleForgotPassword: async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: user,
      },
      JWT_SECRET
    );
    const link = `https://localhost:3000/auth/reset?token=${token}`;
    const html = `<b>Vui lòng click vào đây để lấy lại mật khẩu <a href="${link}">tại đây</a></b>`;
    SendMail(email, "Lấy lại mật khẩu", html);
    res.redirect("/auth/login");
  },

  reset: (req, res) => {
    const { token } = req.query;
    req.flash("token", token);

    res.render("auth/resetPassword", {
      layout: "layouts/auth.layout.ejs",
    });
  },

  handleReset: async (req, res) => {
    const token = req.flash("token");
    const { password, repassword } = req.body;
    if (password === repassword) {
      try {
        const decoded = jwt.verify(token[0], JWT_SECRET);
        await User.update(
          { password: bcrypt.hashSync(password, saltRounds) },
          {
            where: {
              email: decoded.data.email,
            },
          }
        );
      } catch (err) {
        console.log(err);
      }
      res.redirect("/auth/login");
    } else {
      res.redirect("/auth/reset");
    }
  },

  resetOtp: async (req, res) => {
    const { id, email } = req.user;

    const userOtp = await OTP.findOne({
      where: {
        userId: id,
      },
    });

    if (userOtp) {
      await userOtp.destroy({
        where: {
          userId: id,
        },
      });
    }

    const otp = Math.floor(Math.random() * 90000) + 10000; // otp có 5 chữ số
    const timeExpires = new Date(new Date().getTime() + 15000);
    const html = "<b>Mã xác minh để đăng nhập: </b>" + otp;
    SendMail(email, "Xác minh tài khoản", html);
    await OTP.create({
      otpCode: otp,
      userId: id,
      expiryTime: timeExpires,
    });
    req.flash("email", email);
    res.redirect("/auth/verification");
  },

  firstLogin: (req, res) => {
    res.render("auth/firstLogin", {
      layout: "layouts/auth.layout.ejs",
    });
  },

  handleFirstLogin: async (req, res) => {
    const { password, repassword } = req.body;
    if (password === repassword) {
      try {
        await User.update(
          {
            password: bcrypt.hashSync(password, saltRounds),
            firstLogin: 1,
          },
          {
            where: {
              email: req.user.email,
            },
          }
        );

        return res.redirect("/admin");
      } catch (err) {
        console.log(err);
      }
    }
  },
};
