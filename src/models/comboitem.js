"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ComboItem extends Model {
    static associate(models) {
      ComboItem.belongsTo(models.Combo, { foreignKey: "comboId" });
      ComboItem.belongsTo(models.Product, { foreignKey: "productId" });
    }
  }
  ComboItem.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      comboId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "ComboItem",
      tableName: "comboitems",
    }
  );
  return ComboItem;
};
