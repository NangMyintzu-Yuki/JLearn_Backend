'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('grammars', {
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
      title: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      setsuzoku: {
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
      meaning: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      example:{
        allowNull:true,
        type:Sequelize.TEXT
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
    await queryInterface.dropTable('grammars');
  }
};