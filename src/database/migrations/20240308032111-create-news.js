"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("News", {
      news_id: {
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
      publish_date: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("News");
  },
};
