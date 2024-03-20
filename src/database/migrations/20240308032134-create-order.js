"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      orderDate: {
        type: Sequelize.DATE,
      },
      totalAmount: {
        type: Sequelize.DECIMAL,
      },
      status: {
        type: Sequelize.STRING(200),
      },
      phone: {
        type: Sequelize.STRING(20),
      },
      province: {
        type: Sequelize.STRING(100),
      },
      district: {
        type: Sequelize.STRING(100),
      },
      ward: {
        type: Sequelize.STRING(100),
      },
      addressDetail: {
        type: Sequelize.STRING(255),
      },
      orderNote: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      createdBy: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedBy: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Orders");
  },
};
