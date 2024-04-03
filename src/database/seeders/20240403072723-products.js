"use strict";
const model = require("../../models/index");
const Product = model.Product;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Product.bulkCreate("Products", [
      {
        name: "Giường gỗ ",
        description: "đẹp",
        originalPrice: 100.0,
        discountPrice: 90.0,
        price: 90.0,
        quantityAvailable: 10,
        sold: 5,
        categoryId: 1,
        brandId: 1,
        otherDetails: "Other details of Product 1",
        group: "Group 1",
        url: "/product-1",
        metaTitle: "Meta Title of Product 1",
        metaDescription: "Meta Description of Product 1",
        metaKeywords: "Keyword1, Keyword2",
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 20,
        updatedBy: 20,
      },
      {
        name: "ghế",
        description: "đẹp hơn",
        originalPrice: 200.0,
        discountPrice: 97.0,
        price: 97.0,
        quantityAvailable: 10,
        sold: 5,
        categoryId: 1,
        brandId: 1,
        otherDetails: "Other details of Product 1",
        group: " 1",
        url: "/product-1",
        metaTitle: "Meta Title of Product 1",
        metaDescription: "Meta Description of Product 1",
        metaKeywords: "Keyword1, Keyword2",
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 20,
        updatedBy: 20,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
