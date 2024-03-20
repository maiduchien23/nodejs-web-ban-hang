"use strict";
const bcrypt = require("bcrypt");
const saltRounds = 10;

const model = require("../../models/index");
const Type = model.Type;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const typeAdmin = await Type.findOne({
      where: {
        name: "Admin",
      },
    });

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Đức Hiền",
          email: "mdhien2302@gmail.com",
          password: bcrypt.hashSync("123456", saltRounds),
          phone: "0869998888",
          address: "Hà Nội",
          typeId: typeAdmin.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Mai Đức Hiền",
          email: "maiduchien23@gmail.com",
          password: bcrypt.hashSync("123456", saltRounds),
          phone: "0869998888",
          address: "Hà Nội",
          typeId: typeAdmin.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
