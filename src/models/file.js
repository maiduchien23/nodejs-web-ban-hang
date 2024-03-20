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
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING(255),
      url: DataTypes.STRING(255),
      size: DataTypes.INTEGER,
      extension: DataTypes.STRING(10),
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "File",
      tableName: "files",
    }
  );
  return File;
};
