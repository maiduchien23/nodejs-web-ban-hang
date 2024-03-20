module.exports = (req, res, next) => {
  if (req.user && req.user.firstLogin) {
    next();
  } else {
    return res.redirect("/auth/first-login");
  }
};
