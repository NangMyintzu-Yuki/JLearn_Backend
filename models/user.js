'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //relationship with role
      User.belongsTo(models.Role, {
        foreignKey: 'role_id',
        sourceKey: 'role_id'
      })

    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      role_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "roles",
          },
          key: "id",
        },
      },
      fullname: {
        type: DataTypes.STRING,
      },
      username: {
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      address:{
        type:DataTypes.STRING,
      },
      register_date:{
        type:DataTypes.STRING,
      },
      profile:{
        type:DataTypes.STRING,
      },
      active: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      created_by: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "operators",
          },
          key: "id",
        },
      },
      updated_by: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "operators",
          },
          key: "id",
        },
      },
      deleted_by: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "operators",
          },
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      tableName: "users",
    }
  );
  return User;
};