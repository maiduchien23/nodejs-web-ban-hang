"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ProductAttributes", {
      attribute_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Products",
          key: "product_id",
        },
        onDelete: "CASCADE",
      },
      attribute_value_id: {
        type: Sequelize.INTEGER,
      },
      attribute_type: {
        type: Sequelize.STRING(100),
      },
      attribute_color: {
        type: Sequelize.STRING(4),
      },
      status: {
        type: Sequelize.STRING(200),
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("ProductAttributes");
  },
};
