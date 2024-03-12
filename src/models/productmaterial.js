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
      material_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      material_name: DataTypes.STRING(100),
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "ProductMaterial",
      tableName: "Product_Materials",
    }
  );
  return ProductMaterial;
};
