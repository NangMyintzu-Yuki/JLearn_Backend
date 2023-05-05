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

    await queryInterface.bulkInsert('kanjis', [
      {
        id: 1,
        level: 'N5',
        kanji: '会',
        romaji: 'au',
        kunyomi: 'あう',
        stroke: 7,
        meaning: '[{"en": "to meet", "mm": "တွေ့ဆုံသည်"}]',
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
    await queryInterface.bulkDelete('kanjis', null, {})
  }
};
