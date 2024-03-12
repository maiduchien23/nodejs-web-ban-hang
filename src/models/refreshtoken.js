// models/RefreshToken.js
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    static associate(models) {
      RefreshToken.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  RefreshToken.init(
    {
      refresh_token_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: DataTypes.INTEGER,
      token: DataTypes.STRING(200),
      expiry_date: DataTypes.DATE,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "RefreshToken",
      tableName: "Refresh_Tokens",
    }
  );
  return RefreshToken;
};
