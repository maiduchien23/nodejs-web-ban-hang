"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductAttribute extends Model {
    static associate(models) {
      ProductAttribute.belongsTo(models.Product, { foreignKey: "productId" });
    }
  }
  ProductAttribute.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      productId: DataTypes.INTEGER,
      attributeValueId: DataTypes.INTEGER,
      attributeType: DataTypes.STRING(100),
      attributeColor: DataTypes.STRING(4),
      status: DataTypes.STRING(200),
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "ProductAttribute",
      tableName: "productattributes",
    }
  );
  return ProductAttribute;
};
