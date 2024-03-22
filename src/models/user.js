"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Type, { foreignKey: "typeId" });
      User.hasMany(models.Order, { foreignKey: "userId" });
      User.hasMany(models.SocialAccount, { foreignKey: "userId" });
      User.hasMany(models.Session, { foreignKey: "userId" });
      User.hasMany(models.RefreshToken, { foreignKey: "userId" });
      User.hasMany(models.VerificationToken, { foreignKey: "userId" });
      User.hasMany(models.UserRole, { foreignKey: "userId" });
      User.hasMany(models.OTP, { foreignKey: "userId" });
      User.belongsToMany(models.Role, {
        through: "UserRole",
        foreignKey: "userId",
      });
      User.belongsToMany(models.Permission, {
        through: "UserPermissions",
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      id: {
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
      phone: DataTypes.STRING,
      typeId: DataTypes.INTEGER,
      firstLogin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );
  return User;
};
