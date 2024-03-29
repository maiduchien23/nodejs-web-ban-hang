const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const model = require("../../models/index");
const User = model.User;

module.exports = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      done(null, false, { message: "Email không tồn tại" });
      return;
    }

    const hash = user.password;
    bcrypt.compare(password, hash, (err, result) => {
      console.log("Result: ", result);
      if (result) {
        done(null, user);
        return;
      }
      done(null, false, {
        message: "Mật khẩu không chính xác",
      });
    });
  }
);
