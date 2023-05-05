'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //relationship with operator
      Role.hasMany(models.Operator, {
        foreignKey: 'role_id'
      })
      Role.belongsTo(models.Operator, {
        foreignKey: 'created_by',
        sourceKey: 'created_by',
        as: 'createdBy'
      })
      Role.belongsTo(models.Operator, {
        foreignKey: 'updated_by',
        sourceKey: 'updated_by',
        as: 'updatedBy'
      })
      Role.belongsTo(models.Operator, {
        foreignKey: 'deleted_by',
        sourceKey: 'deleted_by',
        as: 'deletedBy'
      })

      // relationship with user
      Role.hasMany(models.User, {
        foreignKey: 'role_id'
      })

    }
  }
  Role.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      description: {
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
      modelName: "Role",
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      tableName: "roles",
    }
  );
  return Role;
};