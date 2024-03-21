const model = require("../../models/index");
const RefreshToken = model.RefreshToken;

module.exports = async (req, res, next) => {
  const token = req.cookies.token;
  const { id } = req.user;

  if (token) {
    const tokenUser = await RefreshToken.findOne({
      where: {
        token: token,
        userId: id,
      },
    });
    if (tokenUser) {
      next();
      return;
    } else {
      req.logout(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
      return;
    }
  }

  next();
};
