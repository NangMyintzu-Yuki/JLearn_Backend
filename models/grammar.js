'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Grammar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // relationship with operator
      Grammar.belongsTo(models.Operator, {
        foreignKey: 'created_by',
        sourceKey: 'created_by',
        as: 'createdBy'
      })
      Grammar.belongsTo(models.Operator, {
        foreignKey: 'updated_by',
        sourceKey: 'updated_by',
        as: 'updatedBy'
      })
      Grammar.belongsTo(models.Operator, {
        foreignKey: 'deleted_by',
        sourceKey: 'deleted_by',
        as: 'deletedBy'
      })
     
    }
  }
  Grammar.init({
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    level: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    setsuzoku: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    furigana:{
      allowNull:true,
      type:DataTypes.STRING,
    },
    romaji:{
      allowNull:false,
      type:DataTypes.STRING,
    },
    meaning: {
      allowNull: true,
      type: DataTypes.TEXT
    },
    example: {
      allowNull: true,
      type: DataTypes.TEXT
    },
    created_by: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'operators'
        },
        key: "id"
      }
    },
    updated_by: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'operators'
        },
        key: "id"
      }
    },
    deleted_by: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'operators'
        },
        key: "id"
      }
    },
  }, {
    sequelize,
    modelName: 'Grammar',
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    tableName: 'grammars'
  });
  return Grammar;
};