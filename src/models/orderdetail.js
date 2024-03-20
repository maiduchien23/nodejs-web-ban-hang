// models/OrderDetail.js
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    static associate(models) {
      OrderDetail.belongsTo(models.Order, { foreignKey: "orderId" });
      OrderDetail.belongsTo(models.Product, { foreignKey: "productId" });
    }
  }
  OrderDetail.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      orderId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      pricePerUnit: DataTypes.DECIMAL,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "OrderDetail",
      tableName: "orderdetails",
    }
  );
  return OrderDetail;
};
