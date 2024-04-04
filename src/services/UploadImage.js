const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const directory = "./public/uploads/images";

    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
    cb(null, directory);
  },
  filename: function (req, file, cb) {
    const dateNow = Date.now();
    cb(null, `Image_${dateNow}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

module.exports = {
  uploadImage: upload.single("image"),
};
