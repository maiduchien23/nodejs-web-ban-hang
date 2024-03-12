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
      name: DataTypes.STRING(50),
      password: DataTypes.STRING(100),
      email: {
        type: DataTypes.STRING(200),
        unique: true,
      },
      address: DataTypes.STRING(200),
      phone_number: DataTypes.STRING,
      first_login: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
    }
  );
  return User;
};
