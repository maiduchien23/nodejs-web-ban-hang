"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("News", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING(255),
      },
      content: {
        type: Sequelize.TEXT,
      },
      author: {
        type: Sequelize.STRING(100),
      },
      publishDate: {
        type: Sequelize.DATE,
      },
      productUrl: {
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
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("News");
  },
};
