"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Order, { foreignKey: "user_id" });
      User.hasMany(models.SocialAccount, { foreignKey: "user_id" });
      User.hasMany(models.Session, { foreignKey: "user_id" });
      User.hasMany(models.RefreshToken, { foreignKey: "user_id" });
      User.hasMany(models.VerificationToken, { foreignKey: "user_id" });
      User.hasMany(models.UserRole, { foreignKey: "user_id" });
      User.hasMany(models.OTP, { foreignKey: "user_id" });
      // Add other associations here
    }
  }
  User.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: DataTypes.STRING(50),
      password: DataTypes.STRING(100),
      email: {
        type: DataTypes.STRING(200),
        unique: true,
      },
      address: DataTypes.STRING(200),
      phone_number: DataTypes.STRING,
      firstLogin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
    }
  );
  return User;
};
