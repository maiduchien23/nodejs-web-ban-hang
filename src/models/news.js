"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    static associate(models) {
      // Define associations here
    }
  }
  News.init(
    {
      news_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: DataTypes.STRING(255),
      content: DataTypes.TEXT,
      author: DataTypes.STRING(100),
      publish_date: DataTypes.DATE,
      product_url: DataTypes.STRING(255),
      meta_title: DataTypes.STRING(255),
      meta_description: DataTypes.TEXT,
      meta_keywords: DataTypes.TEXT,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "News",
      tableName: "News",
    }
  );
  return News;
};
