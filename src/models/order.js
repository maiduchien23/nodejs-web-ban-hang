"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: "user_id" });
      Order.hasMany(models.OrderDetail, { foreignKey: "order_id" });
    }
  }
  Order.init(
    {
      order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: DataTypes.INTEGER,
      order_date: DataTypes.DATE,
      total_amount: DataTypes.DECIMAL,
      status: DataTypes.STRING(200),
      phone_number: DataTypes.STRING(20),
      province: DataTypes.STRING(100),
      district: DataTypes.STRING(100),
      ward: DataTypes.STRING(100),
      address_detail: DataTypes.STRING(255),
      order_note: DataTypes.TEXT,
      created_at: DataTypes.DATE,
      created_by: DataTypes.INTEGER,
      updated_at: DataTypes.DATE,
      updated_by: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "Orders",
    }
  );
  return Order;
};
