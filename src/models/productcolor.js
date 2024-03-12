"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductColor extends Model {
    static associate(models) {
      // Define associations here
    }
  }
  ProductColor.init(
    {
      color_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      color_name: DataTypes.STRING(50),
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "ProductColor",
      tableName: "Product_Colors",
    }
  );
  return ProductColor;
};
