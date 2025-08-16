'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Quiz extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Quiz.belongsTo(models.Operator,{
        foreignKey:'created_by',
        sourceKey:'creaetd_by',
        as:'createdBy'
      });
      Quiz.belongsTo(models.Operator,{
        foreignKey:'updated_by',
        sourceKey:'updated_by',
        as:'updatedBy',
      });
      Quiz.belongsTo(models.Operator,{
        foreignKey:'deleted_by',
        sourceKey:'deleted_by',
        as:'deletedBy'
      });
      Quiz.hasMany(models.UserQuizSubmit,{
        foreignKey:'quiz_id'
      })
    }
  }
  Quiz.init({
    id:{
      allowNull:false,
      type:DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true,
    },
    question:{
      allowNull:false,
      type:DataTypes.TEXT,
    },
    parent_id:{
      allowNull:false,
      type:DataTypes.INTEGER,
    },
    type:{
      allowNull:false,
      type:DataTypes.INTEGER,
    },
    level:{
      allowNull:false,
      type:DataTypes.TEXT,
    },
    option_1:{
      allowNull:true,
      type:DataTypes.TEXT,
    },
    option_2:{
      allowNull:true,
      type:DataTypes.TEXT,
    },
    option_3:{
      allowNull:true,
      type:DataTypes.TEXT,
    },
    option_4:{
      allowNull:true,
      type:DataTypes.TEXT,
    },
    answer:{
      allowNull:true,
      type:DataTypes.STRING,
    },
    mark:{
      allowNull:true,
      type:DataTypes.INTEGER,
    },
    created_by:{
      allowNull:false,
      type:DataTypes.INTEGER,
      references:{
        model:{
          tableName:'operators',
        },
        key:'id'
      }
    },
    updated_by:{
      allowNull:false,
      type:DataTypes.INTEGER,
      references:{
        model:{
          tableName:'operators',
        },
        key:'id'
      }
    },
    deleted_by:{
      allowNull:true,
      type:DataTypes.INTEGER,
      references:{
        model:{
          tableName:'operators',
        },
        key:'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Quiz',
    paranoid:true,
    createdAt:'created_at',
    updatedAt:'updated_at',
    deletedAt:'deleted_at',
    tableName:'quizzes'
  });
  return Quiz;
};