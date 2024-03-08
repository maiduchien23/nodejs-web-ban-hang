"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductVariant extends Model {
    static associate(models) {
      ProductVariant.belongsTo(models.Product, { foreignKey: "product_id" });
    }
  }
  ProductVariant.init(
    {
      variant_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_id: DataTypes.INTEGER,
      color: DataTypes.STRING(50),
      size: DataTypes.STRING(20),
      original_price: DataTypes.DECIMAL,
      discount_price: DataTypes.DECIMAL,
      price: DataTypes.DECIMAL,
      quantity_available: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "ProductVariant",
      tableName: "Product_Variants",
    }
  );
  return ProductVariant;
};
