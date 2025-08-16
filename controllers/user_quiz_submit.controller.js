const Joi = require('joi')
const BaseController = require('./base.controller')
const { UserQuizSubmit} = require('../models')
const {messages, httpStatusCode,errors} = require('../utils/constant')
const ResourceNotFound = require('../errors/resource_not_found.error')
const handleError = require('../errors/handle_error')

let user_quiz_submit;

const validate = async (req,res,next) =>{
  user_quiz_submit = new BaseController(UserQuizSubmit);
  let action = req.url.split('/').pop();
  let schema = {};
  switch(action){
    case "create":
      schema = Joi.object({
        quiz_id :Joi.number().integer().required(),
        user_id:Joi.number().integer().required(),
        user_answer: Joi.number().integer().required(),
        created_by:Joi.number().integer().required(),
        updated_by:Joi.number().integer().required(),
      });
      break;
      case "update":
        schema = Joi.object({
          id:Joi.number().integer().required(),
          quiz_id:Joi.number().integer(),
          user_id:Joi.number().integer(),
          user_answer:Joi.number().integer(),
          updated_by:Joi.number().integer().required(),
        });
        break;
        case "detail":
          schema = Joi.object({
            id:Joi.number().integer().required(),
          });
          break;
          case "delete":
            schema  = Joi.object({
              id:Joi.number().integer().required(),
              deleted_by:Joi.number().integer().required(),
            });
            break;
            default:
              schema = {};
              break;
  }
  if (Object.keys(schema).length !== 0){
    const {error} = schema.validate(req.body,{abortEarly:false});
    if(error){
      const {code,status,formatedError} = user_quiz_submit.formatValidationErrors(error.details);
      res.json({code,status,data:formatedError});
    }else{
      next();
    }
  }else{
    next();
  }
}

const create = async (req,res) =>{
  try{
    const result = await user_quiz_submit.create(req.body);
    const formatedResult = user_quiz_submit.formatResponse(result,messages.created);
    res.status(httpStatusCode.CREATED).json(formatedResult);
  }catch(err){
    handleError(res,err,errors.CREATE_ERROR);
  }
}

const update = async(req,res) =>{
  try {
    const result = await user_quiz_submit.update(req.body);
    if(result[0] === 0 || result === 0){
      throw new ResourceNotFound(messages.failedToUpdate);
    }else{
      const updatedData = await user_quiz_submit.handleUpdate(req.body.id);
      res.json(updatedData);
    }
  } catch (err) {
      handleError(res,err,errors.UPDATE_ERROR);
  }
}
const findAll  = async(req,res) =>{
  try {
    const result = await user_quiz_submit.findAll(req.query);
    res.json(result);
  } catch (err) {
    handleError(res,err,errors.RETRIEVE_ERROR)
  }
}
const findById = async (req,res)=>{
  try {
    const result = await user_quiz_submit.findById(req.body.id);
    if(result === null){
      throw new ResourceNotFound();
    }else{
      const formatedResult = user_quiz_submit.formatResponse(result);
      res.json(formatedResult);
    }
  } catch (err) {
    handleError(res,err,errors.RETRIEVE_ERROR);
  }
}
const deleteById = async (req,res) =>{
  try {
    const result = await user_quiz_submit.deleteById(req.body);
    if(result[0] === 0 || result === 0){
      throw new ResourceNotFound(messages.failedToDelete)
    }else{
      const formatedResult = user_quiz_submit.formatResponse(null,messages.deleted);
      res.json(formatedResult);
    }
  } catch (err) {
    handleError(res,err,errors.DELETE_ERROR);
  }
}
module.exports = {
  create,
  update,
  findAll,
  findById,
  deleteById,
  validate
}