"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductAttribute extends Model {
    static associate(models) {
      ProductAttribute.belongsTo(models.Product, { foreignKey: "product_id" });
    }
  }
  ProductAttribute.init(
    {
      attribute_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_id: DataTypes.INTEGER,
      attribute_value_id: DataTypes.INTEGER,
      attribute_type: DataTypes.STRING(100),
      attribute_color: DataTypes.STRING(4),
      status: DataTypes.STRING(200),
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "ProductAttribute",
      tableName: "Product_Attributes",
    }
  );
  return ProductAttribute;
};
