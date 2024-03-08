"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Products", {
      product_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      product_name: {
        type: Sequelize.STRING(200),
      },
      description: {
        type: Sequelize.TEXT,
      },
      original_price: {
        type: Sequelize.DECIMAL,
      },
      discount_price: {
        type: Sequelize.DECIMAL,
      },
      price: {
        type: Sequelize.DECIMAL,
      },
      quantity_available: {
        type: Sequelize.INTEGER,
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Categories",
          key: "category_id",
        },
        onDelete: "CASCADE",
      },
      brand_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Brands",
          key: "brand_id",
        },
        onDelete: "CASCADE",
      },
      other_details: {
        type: Sequelize.TEXT,
      },
      group: {
        type: Sequelize.STRING(50),
      },
      product_url: {
        type: Sequelize.STRING(255),
      },
      meta_title: {
        type: Sequelize.STRING(255),
      },
      meta_description: {
        type: Sequelize.TEXT,
      },
      meta_keywords: {
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
          key: "user_id",
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
          key: "user_id",
        },
        onDelete: "CASCADE",
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Products");
  },
};
