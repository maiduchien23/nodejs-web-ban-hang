"use strict";
const bcrypt = require("bcrypt");
const saltRounds = 10;
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        name: "Mai Đức Hiền",
        password: await bcrypt.hash("123456", saltRounds),
        email: "mhien2302@gmail.com",
        address: "Hà Nội",
        phone_number: "0123456789",
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        name: "Mai Đức Hiếu",
        password: await bcrypt.hash("123456", saltRounds),
        email: "hieu@gmail.com",
        address: "Hà Nội",
        phone_number: "0123456789",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
