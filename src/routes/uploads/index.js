const express = require("express");
const router = express.Router();
const uploadController = require("../../http/controller/uploads/upload.Controller");
const multer = require("multer");
const path = require("path");
const appRoot = require("app-root-path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, appRoot + "/public/upload/image/");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });

let uploadMultipleFiles = multer({
  storage: storage,
  fileFilter: imageFilter,
}).array("multiple_images", 3);

router.get("/upload", uploadController.getUploadFilePage);
router.post(
  "/upload-profile-pic",
  upload.single("profile_pic"),
  uploadController.handleUploadFile
);

router.post(
  "/upload-multiple-images",
  (req, res, next) => {
    uploadMultipleFiles(req, res, (err) => {
      if (
        err instanceof multer.MulterError &&
        err.code === "LIMIT_UNEXPECTED_FILE"
      ) {
        // handle multer file limit error here
        res.send("LIMIT_UNEXPECTED_FILE");
      } else if (err) {
        res.send(err);
      } else {
        // make sure to call next() if all was well
        next();
      }
    });
  },
  uploadController.handleUploadMultipleFiles
);

module.exports = router;
