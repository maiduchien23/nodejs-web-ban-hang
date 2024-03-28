"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Types", [
      {
        name: "Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Customer",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Manager",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Types", null, {});
  },
};
