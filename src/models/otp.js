// models/OTP.js
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OTP extends Model {
    static associate(models) {
      OTP.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  OTP.init(
    {
      otp_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: DataTypes.INTEGER,
      otp_code: {
        type: DataTypes.STRING(10),
        unique: true,
      },
      expiry_time: DataTypes.DATE,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "OTP",
      tableName: "OTP",
    }
  );
  return OTP;
};
