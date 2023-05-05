'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Level extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //relationship with user
      Level.belongsTo(models.User, {
        foreignKey: "created_by",
        sourceKey: "created_by",
        as: "createdBy",
      });
      Level.belongsTo(models.User, {
        foreignKey: "updated_by",
        sourceKey: "updated_by",
        as: "updatedBy",
      })
      Level.belongsTo(models.User, {
        foreignKey: "deleted_by",
        sourceKey: "deleted_by",
        as: "deletedBy"
      });

    }
  }
  Level.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      level_no: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      level_name: {
        allowNull: false,
        type: DataTypes.STRING,
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
            tableName: "users"
          },
          key: "id",
        }
      },
      updated_by: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "users",
          },
          key: "id",
        },
      },
      deleted_by: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "users",
          },
          key: "id",
        },
      },

    },
    {
      sequelize,
      modelName: "Level",
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      tableName: "levels",
    });
  return Level;
};