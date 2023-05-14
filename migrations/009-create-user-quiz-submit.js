'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_quiz_submits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      quiz_id:{
        allowNull:false,
        type:Sequelize.INTEGER,
        onUpdate:'CASCADE',
        onDelete:'CASCADE',
        references:{
          model:{
            tableName:'quizzes',
          },
          key:"id"
        }
      },
      user_id:{
        allowNull:false,
        type:Sequelize.INTEGER,
        onUpdate:'CASCADE',
        onDelete:'CASCADE',
        references:{
          model:{
            tableName:'users',
          },
          key:"id"
        }
      },
      user_answer: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      },
      deleted_at: {
        type: Sequelize.DATE
      },
      created_by: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate:'CASCADE',
        onDelete:'CASCADE',
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
        onUpdate:'CASCADE',
        onDelete:'CASCADE',
        references: {
          model: {
            tableName: "operators"
          },
          key: "id"
        }
      },
      deleted_by: {
        allowNull: true,
        type: Sequelize.INTEGER,
        onUpdate:'CASCADE',
        onDelete:'CASCADE',
        references: {
          model: {
            tableName: "operators",
          },
          key: "id"
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_quiz_submits');
  }
};