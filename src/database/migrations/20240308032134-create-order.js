"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Orders", {
      order_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "user_id",
        },
        onDelete: "CASCADE",
      },
      order_date: {
        type: Sequelize.DATE,
      },
      total_amount: {
        type: Sequelize.DECIMAL,
      },
      status: {
        type: Sequelize.STRING(200),
      },
      phone_number: {
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
      address_detail: {
        type: Sequelize.STRING(255),
      },
      order_note: {
        type: Sequelize.TEXT,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      created_by: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "user_id",
        },
        onDelete: "CASCADE",
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_by: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "user_id",
        },
        onDelete: "CASCADE",
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Orders");
  },
};
