"use strict";

const { generateHash } = require("../services/auth.services");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: 1,
          role_id: 1,
          fullname: "User One",
          username: "User One",
          phone: "0925959904",
          password: await generateHash("useronepassword"),
          email: "userone@gmail.com",
          active: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          role_id: 2,
          fullname: "User Two",
          username: "User Two",
          phone: "09259521104",
          password: await generateHash("usertwopassword"),
          email: "usertwo@gmail.com",
          active: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users", null, {});
  },
};
