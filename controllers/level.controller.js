const Joi = require('joi')
const BaseController = require('./base.controller')
const { Level } = require('../models')
const { messages, httpStatusCode, errors } = require('../utils/constant')
const ResourceNotFound = require('../errors/resource_not_found.error')
const handleError = require('../errors/handle_error');


let level;
const validate = async (req, res, next) => {
  level = new BaseController(Level);
  let action = req.url.split('/').pop();
  let schema = {};
  switch (action) {
    case "create":
      schema = Joi.object({
        level_no: Joi.number().integer().required(),
        level_name: Joi.string().required(),
        active: Joi.number().integer().required(),
        created_by: Joi.number().integer().required(),
        updated_by: Joi.number().integer().required(),
      });
      break;
    case "update":
      schema = Joi.object({
        id: Joi.number().integer().required(),
        level_no: Joi.number(),
        level_name: Joi.string(),
        active: Joi.number().integer(),
        updated_by: Joi.number().integer(),
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
      schema = {}
  }
  if (Object.keys(schema).length !== 0) {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const { code, status, formatedError } = formatValidationErrors(error.details)
      res.json({ code, status, data: formatedError })
    }
    else {
      next();
    }
  }
  else {
    next();
  }
}
const create = async (req, res) => {
  try {
    let result = await level.create(req.body);
    const formatedResult = level.formatResponse(result, messages.created)
    res.status(httpStatusCode.CREATED).json(formatedResult)
  } catch (err) {
    handleError(res, err, errors.CREATE_ERROR)
  }
}
const update = async (req, res) => {
  try {
    const result = await level.update(req.body)
    if (result === 0) {
      throw new ResourceNotFound(messages.failedToUpdate)
    }
    else {
      const updatedData = await level.handleUpdate(req.body.id)
      res.json(updatedData)
    }
  } catch (err) {
    handleError(res, err, errors.UPDATE_ERROR)
  }
}

const findAll = async (req, res) => {
  try {
    const result = await level.findAll(req.body)
    res.json(result)
  } catch (err) {
    handleError(res, err, errors.RETRIEVE_ERROR)
  }
}
const findById = async (req, res) => {
  try {
    const result = await level.findById(req.body.id);
    if (result === null) {
      throw new ResourceNotFound();
    }
    else {
      const formatedResult = level.formatResponse(result)
      res.json(formatedResult)
    }
  } catch (err) {
    handleError(res, err, errors.RETRIEVE_ERROR)
  }
}
const deleteById = async (req, res) => {
  try {
    const result = await level.deleteById(req.body);
    if (result === null) {
      throw new ResourceNotFound(messages.failedToDelete)
    }
    else {
      const formatedResult = level.formatResponse(null, messages.deleted);
      res.json(formatedResult)
    }
  } catch (err) {
    handleError(res, err, errors.DELETE_ERROR)
  }
}

module.exports = {
  create,
  update,
  findAll,
  findById,
  deleteById,
  validate,
}