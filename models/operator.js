'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Operator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // relationship with operator
      Operator.belongsTo(models.Operator, {
        foreignKey: 'created_by',
        sourceKey: 'created_by',
        as: 'createdBy'
      })
      Operator.belongsTo(models.Operator, {
        foreignKey: 'updated_by',
        sourceKey: 'updated_by',
        as: 'updatedBy'
      })
      Operator.belongsTo(models.Operator, {
        foreignKey: 'deleted_by',
        sourceKey: 'deleted_by',
        as: 'deletedBy'
      })
      // relationship with role
      Operator.belongsTo(models.Role, {
        foreignKey: 'role_id',
        sourceKey: 'role_id'
      })

      // relation with consonant
      Operator.hasOne(models.Consonant, { foreignKey: 'created_by' })
      Operator.hasOne(models.Consonant, { foreignKey: 'updated_by' })
      Operator.hasOne(models.Consonant, { foreignKey: 'deleted_by' })

      // relation with kanji
      Operator.hasOne(models.Kanji, { foreignKey: 'created_by' })
      Operator.hasOne(models.Kanji, { foreignKey: 'updated_by' })
      Operator.hasOne(models.Kanji, { foreignKey: 'deleted_by' })

      // relation with vocab
      Operator.hasOne(models.Vocab, { foreignKey: 'created_by' })
      Operator.hasOne(models.Vocab, { foreignKey: 'updated_by' })
      Operator.hasOne(models.Vocab, { foreignKey: 'deleted_by' })

      // relation with grammar
      Operator.hasOne(models.Grammar, { foreignKey: 'created_by' })
      Operator.hasOne(models.Grammar, { foreignKey: 'updated_by' })
      Operator.hasOne(models.Grammar, { foreignKey: 'deleted_by' });

      // relation with quiz
      Operator.hasOne(models.Quiz, { foreignKey: 'created_by' })
      Operator.hasOne(models.Quiz, { foreignKey: 'updated_by' })
      Operator.hasOne(models.Quiz, { foreignKey: 'deleted_by' })
  
      // relation with user quiz submit
      Operator.hasOne(models.UserQuizSubmit, { foreignKey: 'created_by' })
      Operator.hasOne(models.UserQuizSubmit, { foreignKey: 'updated_by' })
      Operator.hasOne(models.UserQuizSubmit, { foreignKey: 'deleted_by' })

    }
  }
  Operator.init(
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
      active: {
        allowNull: false,
        type: DataTypes.INTEGER,
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
      }
    },
    {
      sequelize,
      modelName: "Operator",
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      tableName: "operators",
    }
  );
  return Operator;
};