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
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING(200),
      position: DataTypes.STRING(100),
      content: DataTypes.TEXT,
      imageUrl: DataTypes.STRING(255),
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Advertisement",
      tableName: "advertisements",
    }
  );
  return Advertisement;
};
