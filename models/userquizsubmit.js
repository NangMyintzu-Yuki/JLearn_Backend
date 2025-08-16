'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserQuizSubmit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserQuizSubmit.belongsTo(models.Operator, {
        foreignKey: 'created_by',
        sourceKey: 'created_by',
        as: 'createdBy'
      })
      UserQuizSubmit.belongsTo(models.Operator, {
        foreignKey: 'updated_by',
        sourceKey: 'updated_by',
        as: 'updatedBy'
      })
      UserQuizSubmit.belongsTo(models.Operator, {
        foreignKey: 'deleted_by',
        sourceKey: 'deleted_by',
        as: 'deletedBy'
      })
      UserQuizSubmit.belongsTo(models.Quiz,{
        foreignKey:'quiz_id',
        sourceKey:'quiz_id'
      })
      UserQuizSubmit.belongsTo(models.User,{
        foreignKey:'user_id',
        sourceKey:'user_id'
      })
    }
  }
  UserQuizSubmit.init(
    {
    id:{
      allowNull:false,
      type:DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true,
    },
    quiz_id:{
      allowNull:false,
      type:DataTypes.INTEGER,
      references:{
        model:{
          tableName:'quizzes',
        },
        key:'id'
      }
    },
    user_id:{
      allowNull:false,
      type:DataTypes.INTEGER,
      references:{
        model:{
          tableName:'users',
        },
        key:'id'
      }
    },
      user_answer:{
        allowNull:false,
        type:DataTypes.INTEGER,
      },
      is_correct:{
          allowNull:false,
          type:DataTypes.BOOLEAN
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

  }, {
    sequelize,
    modelName: 'UserQuizSubmit',
    paranoid:true,
    createdAt:'created_at',
    updatedAt:'updated_at',
    deletedAt:'deleted_at',
    tableName:'user_quiz_submits'
  });
  return UserQuizSubmit;
};