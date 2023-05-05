'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kanji extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // relationship with operator
      Kanji.belongsTo(models.Operator, {
        foreignKey: 'created_by',
        sourceKey: 'created_by',
        as: 'createdBy'
      })
      Kanji.belongsTo(models.Operator, {
        foreignKey: 'updated_by',
        sourceKey: 'updated_by',
        as: 'updatedBy'
      })
      Kanji.belongsTo(models.Operator, {
        foreignKey: 'deleted_by',
        sourceKey: 'deleted_by',
        as: 'deletedBy'
      })
      // relationship with vocab
      Kanji.hasMany(models.Vocab, {
        foreignKey: 'kanji_id'
      })
    }
  }
  Kanji.init({
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
    kanji: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    romaji: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    kunyomi: {
      type: DataTypes.STRING,
    },
    onyomi: {
      type: DataTypes.STRING,
    },
    stroke: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    meaning: {
      allowNull: false,
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
    modelName: 'Kanji',
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    tableName: 'kanjis'
  });
  return Kanji;
};