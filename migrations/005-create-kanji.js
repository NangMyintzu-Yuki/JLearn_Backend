'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('kanjis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      level: {
        allowNull: false,
        type: Sequelize.STRING
      },
      kanji: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      romaji: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      kunyomi: {
        type: Sequelize.STRING,
      },
      onyomi: {
        type: Sequelize.STRING,
      },
      stroke: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      meaning: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
      created_by: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: {
            tableName: "operators"
          },
          key: "id"
        }
      },
      updated_by: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: {
            tableName: "operators"
          },
          key: "id"
        }
      },
      deleted_by: {
        type: Sequelize.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: {
            tableName: "operators"
          },
          key: "id"
        }
      },

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('kanjis');
  }
};