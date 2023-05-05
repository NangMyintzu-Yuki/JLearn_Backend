'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Consonant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Consonant.belongsTo(models.Operator,{
        foreignKey:'created_by',
        sourceKey:'created_by',
        as:'createdBy'
      })
      Consonant.belongsTo(models.Operator,{
        foreignKey:'updated_by',
        sourceKey:'updated_by',
        as:'updatedBy'
      })
      Consonant.belongsTo(models.Operator,{
        foreignKey:'deleted_by',
        sourceKey:'deleted_by',
        as:'deletedBy'
      })
    }
  }
  Consonant.init(
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      hiragana: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      katakana: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      romaji: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      meaning: {
        allowNull: true,
        type: DataTypes.TEXT
      },
      created_by: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "operators"
          },
          key: "id"
        }
      },
      updated_by: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "operators"
          },
          key: "id"
        }
      },
      deleted_by: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "operators",
          },
          key: "id"
        }
      }
    },
    {
      sequelize,
      modelName: 'Consonant',
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      tableName: 'consonants'
    }
  );
  return Consonant;
};