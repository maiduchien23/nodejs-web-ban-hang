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
      colorId: {
        type: Sequelize.STRING(50),
        references: {
          model: "ProductColors",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      sizeId: {
        type: Sequelize.STRING(20),
        references: {
          model: "ProductSizes",
          key: "id",
        },
        onDelete: "CASCADE",
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
      state: {
        type: Sequelize.STRING(50),
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
