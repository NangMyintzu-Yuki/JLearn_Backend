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
      "operators",
      [
        {
          id: 2,
          role_id: 1,
          fullname: 'Operator Two',
          username: 'Operator Tow',
          email: 'superadmin2@gmail.com',
          phone: '09876543s223',
          password: await generateHash('superadminpassword'),
          active: 1,
          created_by: 1,
          updated_by: 1,
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
    await queryInterface.bulkDelete("operators", null, {});
  },
};
