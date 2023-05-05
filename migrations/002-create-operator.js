"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "operators",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        role_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: {
              tableName: "roles",
            },
            key: "id",
          },
        },
        fullname: {
          type: Sequelize.STRING,
        },
        username: {
          type: Sequelize.STRING,
        },
        password: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
          unique: true,
        },
        phone: {
          type: Sequelize.STRING,
          unique: true,
        },
        active: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        created_by: {
          type: Sequelize.INTEGER,
        },
        updated_by: {
          type: Sequelize.INTEGER,
        },
        deleted_by: {
          type: Sequelize.INTEGER,
        },
        created_at: {
          type: Sequelize.DATE,
        },
        updated_at: {
          type: Sequelize.DATE,
        },
        deleted_at: {
          type: Sequelize.DATE,
        },
      },
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("operators");
  }
}
