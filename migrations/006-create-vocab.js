'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('vocabs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      level: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      kanji_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'kanjis'
          },
          key: 'id'
        }
      },
      kanji: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      furigana: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      romaji: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      type: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      meaning: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      created_by: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'operators'
          },
          key: 'id'
        }
      },
      updated_by: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'operators'
          },
          key: 'id'
        }
      },
      deleted_by: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'operators'
          },
          key: 'id'
        }
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      },
      deleted_at: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('vocabs');
  }
};