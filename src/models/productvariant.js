"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductVariant extends Model {
    static associate(models) {
      ProductVariant.belongsTo(models.Product, { foreignKey: "productId" });
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
      color: DataTypes.STRING(50),
      size: DataTypes.STRING(20),
      originalPrice: DataTypes.DECIMAL,
      discountPrice: DataTypes.DECIMAL,
      price: DataTypes.DECIMAL,
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
