const Joi = require('joi')
const BaseController = require('./base.controller')
const { Quiz } = require('../models')
const { messages, httpStatusCode, errors } = require('../utils/constant')
const ResourceNotFound = require('../errors/resource_not_found.error')
const handleError = require('../errors/handle_error')

let quiz;
const validate = async (req, res, next) => {
  quiz = new BaseController(Quiz);
  let action = req.url.split('/').pop();
  let schema = {};
  switch (action) {
    case "create":
      schema = Joi.object({
        question: Joi.string().required(),
        parent_id: Joi.number().integer().required(),
        level: Joi.string().required(),
        type: Joi.number().integer().required(),
        option_1:Joi.string(),
        option_2:Joi.string(),
        option_3:Joi.string(),
        option_4:Joi.string(),
        answer:Joi.string(),
        created_by: Joi.number().integer().required(),
        updated_by: Joi.number().integer().required(),
      });
      break;
    case "update":
      schema = Joi.object({
        id: Joi.number().integer().required(),
        question: Joi.string(),
        parent_id: Joi.number().integer(),
        level: Joi.string(),
        type: Joi.number().integer(),
        option_1: Joi.string(),
        option_2: Joi.string(),
        option_3: Joi.string(),
        option_4: Joi.string(),
        answer: Joi.string(),
        updated_by: Joi.number().integer().required(),
      });
      break;
    case "detail":
      schema = Joi.object({
        id: Joi.number().integer().required(),
      });
      break;
    case "delete":
      schema = Joi.object({
        id: Joi.number().integer().required(),
        deleted_by: Joi.number().integer().required(),
      });
      break;
    default:
      schema = {};
  }
  if(Object.keys(schema).length !==  0)
  {
    const {error} = schema.validate(req.body,{
      abortEarly:false
    });
    if(error)
    {
      const {code,status,formatedError} = quiz.formatValidationErrors(error.details);
      res.json({code,status,data:formatedError});
    }else{
      next();
    }
  }
  else{
    next();
  }
}

const create = async (req,res) =>{
  try {
    const result = await quiz.create(req.body);
    const formatedResult = quiz.formatResponse(result,messages.created);
    res.status(httpStatusCode.CREATED).json(formatedResult);
  } catch (err) {
    handleError(res,err,errors.CREATE_ERROR);
  }
}
const update = async(req,res)=>{
  try {
    const result = await quiz.update(req.body);
    if(result[0] === 0 || result === 0){
      throw new ResourceNotFound(messages.failedToUpdate);
    }else{
      const updatedData = await quiz.handleUpdate(req.body.id);
      res.json(updatedData);
    }
  } catch (err) {
    handleError(res,err,errors.UPDATE_ERROR);
  }
}
const findAll = async(req,res) =>{
  try {
    const result = await quiz.findAll(req.query)
    console.log('result',result);
    res.json(result);
  } catch (err) {
    handleError(res,err,errors.RETRIEVE_ERROR);
  }
}
const findById = async(req,res)=>{
  try {
    const result = await quiz.findById(req.body.id);
    if(result === null){
      throw new ResourceNotFound();
    }else{
      const formatedResult = quiz.formatResponse(result);
      res.json(formatedResult);
    }
  } catch (err) {
    handleError(res,err,errors.RETRIEVE_ERROR)
  }
}
const deleteById = async(req,res)=>{
  try{
    const result = await quiz.deleteById(req.body);
    console.log("result==>",result[0])
    if(result[0] === 0 || result === 0){
      throw new ResourceNotFound(messages.failedToDelete);
    }else{
      const formatedResult = quiz.formatResponse(null,messages.deleted);
      res.json(formatedResult);
    }
  }catch(err){
    handleError(res,err,errors.DELETE_ERROR)
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