"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ProductVariants", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Products",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      color: {
        type: Sequelize.STRING(50),
      },
      size: {
        type: Sequelize.STRING(20),
      },
      originalPrice: {
        type: Sequelize.DECIMAL,
      },
      discountPrice: {
        type: Sequelize.DECIMAL,
      },
      price: {
        type: Sequelize.DECIMAL,
      },
      quantityAvailable: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("ProductVariants");
  },
};
