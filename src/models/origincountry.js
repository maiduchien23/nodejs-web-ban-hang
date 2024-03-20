"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OriginCountry extends Model {
    static associate(models) {
      // Define associations here
    }
  }
  OriginCountry.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING(100),
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "OriginCountry",
      tableName: "origincountries",
    }
  );
  return OriginCountry;
};
