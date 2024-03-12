"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ComboItem extends Model {
    static associate(models) {
      ComboItem.belongsTo(models.Combo, { foreignKey: "combo_id" });
      ComboItem.belongsTo(models.Product, { foreignKey: "product_id" });
    }
  }
  ComboItem.init(
    {
      combo_item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      combo_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "ComboItem",
      tableName: "Combo_Items",
    }
  );
  return ComboItem;
};
