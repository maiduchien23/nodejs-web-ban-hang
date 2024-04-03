"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductVariant extends Model {
    static associate(models) {
      ProductVariant.belongsTo(models.Product, { foreignKey: "productId" });
      ProductVariant.belongsTo(models.ProductColor, {
        foreignKey: "colorId",
      });
      ProductVariant.belongsTo(models.ProductSize, { foreignKey: "sizeId" });
    }
  }
  ProductVariant.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      productId: DataTypes.INTEGER,
      colorId: DataTypes.STRING(50),
      sizeId: DataTypes.STRING(20),
      originalPrice: DataTypes.DECIMAL,
      discountPrice: DataTypes.DECIMAL,
      price: DataTypes.DECIMAL,
      state: DataTypes.STRING(50),
      quantityAvailable: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "ProductVariant",
      tableName: "productvariants",
    }
  );
  return ProductVariant;
};
