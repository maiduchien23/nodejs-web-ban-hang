// models/VerificationToken.js
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class VerificationToken extends Model {
    static associate(models) {
      VerificationToken.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  VerificationToken.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: DataTypes.INTEGER,
      token: DataTypes.STRING(200),
      expiryDate: DataTypes.DATE,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "VerificationToken",
      tableName: "verificationtokens",
    }
  );
  return VerificationToken;
};
