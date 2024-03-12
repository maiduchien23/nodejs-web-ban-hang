require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const bodyParser = require("body-parser");

const productRouter = require("./routes/products/index");
const adminRouter = require("./routes/admin/index");
const authRouter = require("./routes/auth/index");
const localPassport = require("./passport/auth/localPassport");
const authMiddleware = require("./http/middlewares/auth.Middleware");
const app = express();
const model = require("./models/index");

// View engine setup
app.set("views", path.join(__dirname, "resources/views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/master.layout.ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

// Session middleware
app.use(
  session({
    secret: "123456",
    resave: true,
    saveUninitialized: true,
  })
);

// Flash middleware
app.use(flash());

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user.user_id);
});

passport.deserializeUser(async function (user_id, done) {
  const user = await model.User.findByPk(user_id);
  done(null, user);
});

passport.use("local", localPassport);

// Routes
app.use("/", productRouter);
app.use("/auth", authRouter);
app.use("/admin", authMiddleware, adminRouter);
//app.use("/product", productRouter);

// Error handling
app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
