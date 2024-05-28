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
const methodOverride = require("method-override");
const cors = require("cors");

// Khai báo Router

//const uploadRouter = require("./routes/uploads/index");
const adminRouter = require("./routes/admin/index");
const authRouter = require("./routes/auth/index");
const imageRouter = require("./routes/uploads/image.Router");
const connectRouter = require("./routes/connect/index");

// Khai báo model
const app = express();
const model = require("./models/index");

// Khai báo Passport

const localPassport = require("./passport/auth/localPassport");
const facebookPassport = require("./passport/auth/facebookPassport");
const googlePassport = require("./passport/auth/googlePassport");

// Khai báo Connect-Social

const connectFacebookPassport = require("./passport/connect/facebookPassport");
const connectGooglePassport = require("./passport/connect/googleConnect");

// Khai báo Middleware
const AuthMiddleware = require("./http/middlewares/auth.Middleware");
const LoginFirstTimeMiddleware = require("./http/middlewares/loginFirsttime.Middleware");
//const RoleMiddleware = require("./http/middlewares/role.Middleware");
const DeviceMiddleware = require("./http/middlewares/device.Middleware");
// View engine setup
app.set("views", path.join(__dirname, "./resources/views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/master.layout.ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use((req, res, next) => {
  // Thêm MIME type cho tệp JavaScript
  if (req.url.endsWith(".js")) {
    res.set("Content-Type", "application/javascript");
  }
  next();
});
app.use(express.static(path.join(__dirname, "../public")));
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);
// Session middleware
app.use(
  session({
    secret: "123456",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
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
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  const user = await model.User.findByPk(id);
  done(null, user);
});
// // Connect Social
passport.use("connectFacebook", connectFacebookPassport);
passport.use("connectGoogle", connectGooglePassport);

// // Login Social
passport.use("local", localPassport);
passport.use("facebook", facebookPassport);
passport.use("google", googlePassport);

//Bind Flmngr to serve "/flmngr" URL on your webserver with storage placed in "./files" (mapped to "/files" URL)
// flmngr.bindFlmngr({
//   app: app,
//   urlFileManager: "/flmngr",
//   urlFiles: "/files/",
//   dirFiles: "./files",
// });

// Routes
app.use("/auth", authRouter);
app.use(AuthMiddleware);
app.use(LoginFirstTimeMiddleware);
app.use(DeviceMiddleware);
app.use("/connect", connectRouter);
app.use("/admin", adminRouter);
//app.use("/upload", uploadRouter);
//app.use("/image", imageRouter);

app.use(methodOverride("_method"));
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
