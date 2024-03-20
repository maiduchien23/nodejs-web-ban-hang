"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductMaterial extends Model {
    static associate(models) {
      // Define associations here
    }
  }
  ProductMaterial.init(
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
      modelName: "ProductMaterial",
      tableName: "productmaterials",
    }
  );
  return ProductMaterial;
};
