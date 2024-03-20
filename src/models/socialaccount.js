// models/SocialAccount.js
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SocialAccount extends Model {
    static associate(models) {
      SocialAccount.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  SocialAccount.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: DataTypes.INTEGER,
      socialMedia: DataTypes.STRING,
      socialMediaId: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "SocialAccount",
      tableName: "socialaccounts",
    }
  );
  return SocialAccount;
};
