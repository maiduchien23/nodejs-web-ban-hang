// models/OTP.js
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OTP extends Model {
    static associate(models) {
      OTP.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  OTP.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: DataTypes.INTEGER,
      otpCode: {
        type: DataTypes.STRING(10),
        unique: true,
      },
      expiryTime: DataTypes.DATE,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "OTP",
      tableName: "otp",
    }
  );
  return OTP;
};
