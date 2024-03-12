"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductSize extends Model {
    static associate(models) {
      // Define associations here
    }
  }
  ProductSize.init(
    {
      size_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      size_name: DataTypes.STRING(50),
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "ProductSize",
      tableName: "Product_Sizes",
    }
  );
  return ProductSize;
};
