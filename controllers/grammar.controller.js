const Joi = require('joi')
const BaseController = require('./base.controller');

const { Grammar} = require('../models');
const { messages,httpStatusCode,errors} = require('../utils/constant')
const ResourceNotFound = require('../errors/resource_not_found.error')
const handleError = require('../errors/handle_error')

let grammar;
const validate = async (req,res,next) =>{
  grammar = new BaseController(Grammar);
  let action = req.url.split('/').pop();
  let schema  ={};
  switch(action){
    case "create": Joi.object({
      level:Joi.string().required(),
      title:Joi.string().required(),
      setsuzoku:Joi.string().required(),
      romaji:Joi.string().required(),
      furigana:Joi.string(),
      meaning:Joi.string(),
      example:Joi.string(),
      created_by:Joi.number().integer().required(),
      updated_by:Joi.number().integer().required(),
    });
    break;
    case "update": Joi.object({
      id:Joi.number().integer().required(),
      level: Joi.string(),
      title: Joi.string(),
      setsuzoku: Joi.string(),
      romaji: Joi.string().required(),
      furigana: Joi.string(),
      meaning: Joi.string(),
      example: Joi.string(),
      updated_by: Joi.number().integer().required(),
    });
    break;
    case "detail" : Joi.object({
      id:Joi.number().integer().required(),
    });
    break;
    case "delete": Joi.object({
      id:Joi.number().integer().required(),
      deleted_by:Joi.number().integer().required()
    });
    break;
    default:
      schema:{};
      break;
  }
  if (Object.keys(schema).length !== 0){
    const {error} = schema.validate(req.body,{abortEarly:false});
    if(error){
      const {code,status,formatedError} = grammar.formatValidationErrors(errors.details);
      res.json({code,status,data:formatedError});
    }else{
      next();
    }
  }else{
    next();
  }
}

const create = async(req,res)=>{
  try {
    const result = await grammar.create(req.body);
    const formatedResult = grammar.formatResponse(result,messages.created);
    res.status(httpStatusCode.CREATED).json(formatedResult)
  } catch (err) {
    handleError(res,err,errors.CREATE_ERROR);
  }
}

const update = async(req,res)=>{
  try {
    const result = await grammar.update(req.body);
    if(result[0] === 0){
      throw new ResourceNotFound(messages.failedToUpdate);
    }else{
      const updatedData = await grammar.handleUpdate(req.body.id);
      res.json(updatedData);
    }
  } catch (err) {
    handleError(res,err,errors.UPDATE_ERROR)
  }
}

const findAll = async(req,res) =>{
  try {
    const result = await grammar.findAll(req.query);
    res.json(result);
  } catch (err) {
    handleError(res,err,errors.RETRIEVE_ERROR);
  }
}

const findById = async(req,res)=>{
  try {
    const result = await grammar.findById(req.body.id);
    if(result === 0){
      throw new ResourceNotFound();
    }else{
      const formatedResult = grammar.formatResponse(result);
      res.json(formatedResult);
    }
  } catch (err) {
    handleError(res,err,errors.RETRIEVE_ERROR);
  }
}

const deleteById = async(req,res)=>{
  try {
    const result = await grammar.deleteById(req.body);
    if(result ===0){
      throw new ResourceNotFound(messages.failedToDelete);
    }else{
      const formatedResult = grammar.formatResponse(null,messages.deleted);
      res.json(formatedResult);
    }
  } catch (err) {
    handleError(res,err,errors.failedToDelete);
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