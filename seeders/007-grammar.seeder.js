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
    await queryInterface.bulkInsert('grammars', [
      {
        id: 1,
        level: 'N5',
        title: 'だけ',
        setsuzoku:'（　い、な、N）＋ だけ',
        romaji: 'dake',
        furigana:'だけ',
        meaning: '',
        example: '',
        created_by: 1,
        updated_by: 1,
        created_at: new Date(),
        updated_at: new Date()
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
    await queryInterface.bulkDelete('grammars', null, {});
  }
};
