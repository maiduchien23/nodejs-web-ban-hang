// models/SocialAccount.js
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SocialAccount extends Model {
    static associate(models) {
      SocialAccount.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  SocialAccount.init(
    {
      social_account_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: DataTypes.INTEGER,
      social_media: DataTypes.STRING,
      social_media_id: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "SocialAccount",
      tableName: "Social_Accounts",
    }
  );
  return SocialAccount;
};
