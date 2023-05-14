'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('quizzes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      level: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      question: {
        type: Sequelize.STRING
      },
      parent_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      type: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      option_1: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      option_2: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      option_3: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      option_4: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      answer: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      created_by: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate:'CASCADE',
        onDelete:'CASCADE',
        references: {
          model: {
            tableName: 'operators',
          },
          key: 'id'
        }
      },
      updated_by: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: {
            tableName: 'operators',
          },
          key: 'id'
        }
      },
      deleted_by: {
        allowNull: true,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: {
            tableName: 'operators',
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
      deleted_at:{
        type:Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('quizzes');
  }
};