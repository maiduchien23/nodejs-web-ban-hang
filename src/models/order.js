"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: "userId" });
      Order.hasMany(models.OrderDetail, { foreignKey: "orderId" });
    }
  }
  Order.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      orderCode: DataTypes.STRING(255),
      userId: DataTypes.INTEGER,
      orderDate: DataTypes.DATE,
      totalAmount: DataTypes.DECIMAL,
      status: DataTypes.STRING(200),
      phone: DataTypes.STRING(20),
      province: DataTypes.STRING(100),
      district: DataTypes.STRING(100),
      ward: DataTypes.STRING(100),
      addressDetail: DataTypes.STRING(255),
      orderNote: DataTypes.TEXT,
      createdAt: DataTypes.DATE,
      createdBy: DataTypes.INTEGER,
      updatedAt: DataTypes.DATE,
      updatedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "orders",
    }
  );
  return Order;
};
