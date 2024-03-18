const { Op, Sequelize } = require("sequelize");
const db = require("../../../models");
const File = db.File;
module.exports = {
  getFileList: async (req, res) => {
    try {
      const files = await File.findAll();
      res.render("uploads/home/fileList", { files });
    } catch (error) {
      console.error("Error getting file list:", error);
      res.status(500).send("An error occurred while getting file list.");
    }
  },

  getSearchFile: async (req, res) => {
    const searchText = req.body.searchText.toLowerCase();
    try {
      const files = await File.findAll({
        where: {
          file_name: {
            [Op.iLike]: "%" + searchText + "%", // Sử dụng Op.iLike thay vì Sequelize.Op.iLike
          },
        },
      });
      res.render("fileList", { files });
    } catch (err) {
      console.error("Error searching files:", err);
      res.status(500).send("Internal Server Error");
    }
  },
};
