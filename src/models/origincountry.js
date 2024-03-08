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
      origin_country_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      country_name: DataTypes.STRING(100),
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "OriginCountry",
      tableName: "Origin_Countries",
    }
  );
  return OriginCountry;
};
