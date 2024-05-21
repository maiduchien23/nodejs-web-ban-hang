"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    static associate(models) {}
  }
  News.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: DataTypes.STRING(255),
      content: DataTypes.TEXT,
      author: DataTypes.STRING(100),
      publishDate: DataTypes.DATE,
      productUrl: DataTypes.STRING(255),
      metaTitle: DataTypes.STRING(255),
      metaDescription: DataTypes.TEXT,
      metaKeywords: DataTypes.TEXT,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "News",
      tableName: "news",
    }
  );
  return News;
};
