'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('quizzes', [
      {
        id: 1,
        question:'Test Question',
        parent_id:0,
        level:'N5',
        type: 1,
        option_1:'Option One',
        option_2:'Option Two',
        option_3:"Option Three",
        option_4:"Option Four",
        answer: 2,
        created_by: 1,
        updated_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('quizzes', null, {})

  }
};
