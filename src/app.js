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
const flmngr = require("@flmngr/flmngr-server-node-express");

// Khai báo Router
const productRouter = require("./routes/products/index");
const uploadRouter = require("./routes/uploads/index");
const adminRouter = require("./routes/admin/index");
const authRouter = require("./routes/auth/index");
const imageRouter = require("./routes/uploads/image.Router");

const authMiddleware = require("./http/middlewares/auth.Middleware");

// Khai báo model
const app = express();
const model = require("./models/index");

// Khai báo Passport
const localPassport = require("./passport/auth/localPassport");
const googlePassport = require("./passport/auth/googlePassport");
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
passport.use("google", googlePassport);

//Bind Flmngr to serve "/flmngr" URL on your webserver with storage placed in "./files" (mapped to "/files" URL)
flmngr.bindFlmngr({
  app: app,
  urlFileManager: "/flmngr",
  urlFiles: "/files/",
  dirFiles: "./files",
});

// Routes
app.use("/", uploadRouter);
app.use("/", productRouter);
app.use("/auth", authRouter);
app.use("/admin", authMiddleware, adminRouter);
app.use("/upload", uploadRouter);
app.use("/products", productRouter);
app.use("/image", imageRouter);
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
