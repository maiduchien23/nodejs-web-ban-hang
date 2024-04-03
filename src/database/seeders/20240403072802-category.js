"use strict";
const model = require("../../models/index");
const Category = model.Category;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Category.bulkCreate("Categories", [
      {
        name: "Danh mục 1",
        priority: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 20,
        updatedBy: 20,
      },
      {
        name: "Danh mục 2",
        priority: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 20,
        updatedBy: 20,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
