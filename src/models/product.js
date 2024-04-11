"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, { foreignKey: "categoryId" });
      Product.belongsTo(models.Brand, { foreignKey: "brandId" });
      Product.hasMany(models.ProductVariant, { foreignKey: "productId" });
      Product.hasMany(models.ProductImage, { foreignKey: "productId" });
      Product.hasMany(models.ProductAttribute, { foreignKey: "productId" });
      // Add other associations here
    }
  }
  Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING(200),
      description: DataTypes.TEXT,
      originalPrice: DataTypes.DECIMAL,
      discountPrice: DataTypes.DECIMAL,
      price: DataTypes.DECIMAL(10, 2),
      quantityAvailable: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      brandId: DataTypes.INTEGER,
      otherDetails: DataTypes.TEXT,
      group: DataTypes.STRING(50),
      url: DataTypes.STRING(255),
      metaTitle: DataTypes.STRING(255),
      metaDescription: DataTypes.TEXT,
      metaKeywords: DataTypes.TEXT,
      createdAt: DataTypes.DATE,
      createdBy: DataTypes.INTEGER,
      updatedAt: DataTypes.DATE,
      updatedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "products",
    }
  );
  return Product;
};
