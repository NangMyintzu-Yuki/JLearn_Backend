'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vocab extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // relationship with operator
      Vocab.belongsTo(models.Operator, {
        foreignKey: 'created_by',
        sourceKey: 'created_by',
        as: 'createdBy'
      })
      Vocab.belongsTo(models.Operator, {
        foreignKey: 'updated_by',
        sourceKey: 'updated_by',
        as: 'updatedBy'
      })
      Vocab.belongsTo(models.Operator, {
        foreignKey: 'deleted_by',
        sourceKey: 'deleted_by',
        as: 'deletedBy'
      })
      // relationship with kanji
      Vocab.belongsTo(models.Kanji, {
        foreignKey: 'kanji_id',
        sourceKey: 'kanji_id'
      })
    }
  }
  Vocab.init({
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
    kanji_id: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'kanjis'
        },
        key: 'id'
      }
    },
    kanji: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    furigana: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    romaji: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    type:{
      allowNull:true,
      type:DataTypes.INTEGER,
    },
    meaning: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    created_by: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'operators'
        },
        key: 'id'
      }
    },
    updated_by: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'operators'
        },
        key: 'id'
      }
    },
    deleted_by: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'operators'
        },
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Vocab',
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    tableName: 'vocabs'
  });
  return Vocab;
};