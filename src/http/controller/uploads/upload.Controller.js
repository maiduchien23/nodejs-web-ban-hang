const db = require("../../../models/index");
const File = db.File;

module.exports = {
  getUploadFilePage: async (req, res) => {
    res.render("uploads/home/index");
  },
  handleUploadFile: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).send("Please select a file to upload.");
      }

      // Lưu thông tin về file vào cơ sở dữ liệu
      const newFile = await File.create({
        file_name: req.file.originalname,
        file_url: `/upload/image/${req.file.filename}`,
        size: req.file.size,
        extension: req.file.originalname.split(".").pop(),
      });

      // Hiển thị thông báo và link tới file đã tải lên
      res.send(`
        You have uploaded this image: <hr/>
        <img src="${newFile.file_url}" width="500"><hr /> 
        <a href="/upload">Upload another image</a>
      `);
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).send("An error occurred while uploading the file.");
    }
  },

  handleUploadMultipleFiles: async (req, res) => {
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.files) {
      return res.send("Please select an image to upload");
    }
    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    let index, len;
    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
      result += `<img src="/upload/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="/upload">Upload more images</a>';
    res.send(result);
  },
};
