"use strict";

const model = require("../../models/index");
const Brand = model.Brand;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Brand.bulkCreate("Brands", [
      {
        name: "Hàn Quốc",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Nhật Bản",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Mỹ",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Brands", null, {});
  },
};
