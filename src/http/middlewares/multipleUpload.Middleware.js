const util = require("util");
const path = require("path");
const multer = require("multer");

let storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(`${__dirname}../../../../public/upload/image`));
  },
  filename: (req, file, callback) => {
    let math = ["image/png", "image/jpeg"];
    if (math.indexOf(file.mimetype) === -1) {
      let errorMess = `The file <strong>${file.originalname}</strong> is invalid. Only allowed to upload image jpeg or png.`;
      return callback(errorMess, null);
    }

    let filename = `${Date.now()}-${file.originalname}`;
    callback(null, filename);
  },
});

let uploadManyFiles = multer({ storage: storage }).array("many-files", 5);

let multipleUploadMiddleware = util.promisify(uploadManyFiles);

module.exports = multipleUploadMiddleware;
