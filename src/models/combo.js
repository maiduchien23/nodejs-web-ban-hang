"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Combo extends Model {
    static associate(models) {
      Combo.hasMany(models.ComboItem, { foreignKey: "combo_id" });
    }
  }
  Combo.init(
    {
      combo_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      combo_name: DataTypes.STRING(200),
      price: DataTypes.DECIMAL,
      description: DataTypes.TEXT,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Combo",
      tableName: "Combos",
    }
  );
  return Combo;
};
