const db = require("../../../models/index");
const File = db.File;
const multipleUploadMiddleware = require("../../../http/middlewares/multipleUpload.Middleware");

let debug = console.log.bind(console);

module.exports = {
  getUploadFilePage: async (req, res) => {
    res.render("uploads/home/uploadFile");
  },

  handMultipleUpload: async (req, res) => {
    try {
      await multipleUploadMiddleware(req, res);

      debug(req.files);

      if (req.files.length <= 0) {
        return res.send(`You must select at least 1 file or more.`);
      }

      const filesData = [];
      for (const file of req.files) {
        const newFile = await File.create({
          file_name: file.originalname,
          file_url: `/upload/image/${file.filename}`,
          size: file.size,
          extension: file.originalname.split(".").pop(),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        filesData.push(newFile);
      }

      return res.send(
        `Your files has been uploaded. <br> <a href="/files">Click here</a> to view the file list.`
      );
    } catch (error) {
      debug(error);
      if (error.code === "LIMIT_UNEXPECTED_FILE") {
        return res.send(`Exceeds the number of files allowed to upload.`);
      }

      return res.send(`Error when trying upload many files: ${error}}`);
    }
  },
};
