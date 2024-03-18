const db = require("../../../models/index");
const File = db.File;
module.exports = {
  getAllImages: async (req, res) => {
    try {
      const files = await File.findAll();
      res.json(files);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  addImage: async (req, res) => {
    try {
      const { file_name, file_url, size, extension } = req.body;
      const newFile = await File.create({
        file_name,
        file_url,
        size,
        extension,
      });
      res.JSON(newFile);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  deleteImage: async (req, res) => {
    try {
      const fileId = req.params.fileId;
      await File.destroy({
        where: { id: fileId },
      });
      res.json({ message: "File Delete successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
};
