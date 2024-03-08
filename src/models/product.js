"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, { foreignKey: "category_id" });
      Product.belongsTo(models.Brand, { foreignKey: "brand_id" });
      Product.hasMany(models.ProductVariant, { foreignKey: "product_id" });
      Product.hasMany(models.ProductImage, { foreignKey: "product_id" });
      Product.hasMany(models.ProductAttribute, { foreignKey: "product_id" });
      // Add other associations here
    }
  }
  Product.init(
    {
      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_name: DataTypes.STRING(200),
      description: DataTypes.TEXT,
      original_price: DataTypes.DECIMAL,
      discount_price: DataTypes.DECIMAL,
      price: DataTypes.DECIMAL,
      quantity_available: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
      brand_id: DataTypes.INTEGER,
      other_details: DataTypes.TEXT,
      group: DataTypes.STRING(50),
      product_url: DataTypes.STRING(255),
      meta_title: DataTypes.STRING(255),
      meta_description: DataTypes.TEXT,
      meta_keywords: DataTypes.TEXT,
      createdAt: DataTypes.DATE,
      createdBy: DataTypes.INTEGER,
      updatedAt: DataTypes.DATE,
      updatedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "Products",
    }
  );
  return Product;
};
