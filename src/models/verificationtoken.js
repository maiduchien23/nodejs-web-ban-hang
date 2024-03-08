// models/VerificationToken.js
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class VerificationToken extends Model {
    static associate(models) {
      VerificationToken.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  VerificationToken.init(
    {
      verification_token_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: DataTypes.INTEGER,
      token: DataTypes.STRING(200),
      expiry_date: DataTypes.DATE,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "VerificationToken",
      tableName: "Verification_Tokens",
    }
  );
  return VerificationToken;
};
