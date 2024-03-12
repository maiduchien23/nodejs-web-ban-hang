"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Advertisement extends Model {
    static associate(models) {
      // Define associations here
    }
  }
  Advertisement.init(
    {
      advertisement_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING(200),
      position: DataTypes.STRING(100),
      content: DataTypes.TEXT,
      advertisement_image_url: DataTypes.STRING(255),
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Advertisement",
      tableName: "Advertisements",
    }
  );
  return Advertisement;
};
