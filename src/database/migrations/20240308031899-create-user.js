"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(50),
      },
      password: {
        type: Sequelize.STRING(100),
      },
      email: {
        type: Sequelize.STRING(200),
        unique: true,
      },
      address: {
        type: Sequelize.STRING(200),
      },
      phone: {
        type: Sequelize.STRING,
      },
      typeId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Types",
          key: "id",
        },
      },
      firstLogin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable("Users");
  },
};
