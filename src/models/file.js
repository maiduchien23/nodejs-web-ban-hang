// models/File.js
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    static associate(models) {
      // No association needed for File
    }
  }
  File.init(
    {
      file_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      file_name: DataTypes.STRING(255),
      file_url: DataTypes.STRING(255),
      size: DataTypes.INTEGER,
      extension: DataTypes.STRING(10),
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "File",
      tableName: "Files",
    }
  );
  return File;
};
