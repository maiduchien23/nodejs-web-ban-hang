"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(200),
      },
      description: {
        type: Sequelize.TEXT,
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
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Categories",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      brandId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Brands",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      otherDetails: {
        type: Sequelize.TEXT,
      },
      group: {
        type: Sequelize.STRING(50),
      },
      url: {
        type: Sequelize.STRING(255),
      },
      metaTitle: {
        type: Sequelize.STRING(255),
      },
      metaDescription: {
        type: Sequelize.TEXT,
      },
      metaKeywords: {
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
    await queryInterface.dropTable("Products");
  },
};
