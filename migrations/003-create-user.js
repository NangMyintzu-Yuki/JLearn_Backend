"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "users",
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
              tableName: "roles"
            },
            key: "id"
          }
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
        address: {
          type: Sequelize.STRING,
        },
        register_date: {
          type: Sequelize.STRING,
        },
        profile: {
          type: Sequelize.STRING,
        },
        active: {
          allowNull: false,
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
        created_by: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: {
              tableName: "operators",
            },
            key: "id",
          },
        },
        updated_by: {
          type: Sequelize.INTEGER,
          allowNull: true,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: {
            model: {
              tableName: "operators",
            },
            key: "id",
          },
        },
        deleted_by: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: {
              tableName: "operators",
            },
            key: "id",
          },
        },
      },
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
  }
}
