"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductColor extends Model {
    static associate(models) {
      ProductColor.hasMany(models.ProductVariant, { foreignKey: "colorId" });
    }
  }
  ProductColor.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING(50),
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "ProductColor",
      tableName: "productcolors",
    }
  );
  return ProductColor;
};
