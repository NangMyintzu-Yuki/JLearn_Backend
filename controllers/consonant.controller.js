const Joi = require('joi')
const BaseController = require('./base.controller')
const { Consonant } = require('../models')
const { messages, httpStatusCode, errors } = require('../utils/constant')
const ResourceNotFound = require('../errors/resource_not_found.error')
const handleError = require('../errors/handle_error')

let consonant;
const validate = async (req, res, next) => {
  consonant = new BaseController(Consonant);
  let action = req.url.split('/').pop();
  let schema = {}
  switch (action) {
    case "create":
      schema = Joi.object({
        hiragana: Joi.string().required(),
        katakana: Joi.string().required(),
        romaji: Joi.string().required(),
        meaning: Joi.string(),
        created_by: Joi.number().integer().required(),
        updated_by: Joi.number().integer().required(),
      });
      break;
    case "update":
      schema = Joi.object({
        id: Joi.number().integer().required(),
        hiragana: Joi.string(),
        katakana: Joi.string(),
        romaji: Joi.string(),
        meaning: Joi.string(),
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
      schema = {}
  }
  if (Object.keys(schema).length !== 0) {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const { code, status, formatedError } = consonant.formatValidationErrors(error.details)
      res.json({ code, status, data: formatedError })
    } else {
      next();
    }
  } else {
    next()
  }
}
const create = async (req, res) => {
  try {
    const result = await consonant.create(req.body);
    const formatedResult = consonant.formatResponse(result, messages.created);
    res.status(httpStatusCode.CREATED).json(formatedResult)
  } catch (err) {
    handleError(res, err, errors.CREATE_ERROR)
  }
}
const update = async (req, res) => {
  try {
    const result = await consonant.update(req.body);
    if (result[0] === 0) {
      throw new ResourceNotFound(messages.failedToUpdate)
    } else {
      const updatedData = await consonant.handleUpdate(req.body.id);
      res.json(updatedData)
    }
  } catch (err) {
    handleError(res, err, errors.UPDATE_ERROR)
  }
}
const findAll = async (req, res) => {
  try {
    const result = await consonant.findAll(req.query)
    console.log("result", result)
    res.json(result)
  } catch (err) {
    handleError(res, err, errors.RETRIEVE_ERROR)
  }
}
const findById = async (req, res) => {
  try {
    const result = await consonant.findById(req.body.id);
    if (result === null) {
      throw new ResourceNotFound();
    } else {
      const formatedResult = consonant.formatResponse(result);
      res.json(formatedResult)
    }
  } catch (err) {
    handleError(res, err, errors.RETRIEVE_ERROR)
  }
}
const deleteById = async (req, res) => {
  try {
    const result = await consonant.deleteById(req.body);
    if (result === 0) {
      throw new ResourceNotFound(messages.failedToDelete)
    } else {
      const formatedResult = consonant.formatResponse(null, messages.deleted);
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
  validate
}