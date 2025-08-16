const Joi = require('joi')
const BaseController = require('./base.controller')
const { Kanji } = require('../models')
const { messages, httpStatusCode, errors } = require('../utils/constant')
const ResourceNotFound = require('../errors/resource_not_found.error')
const handleError = require('../errors/handle_error')

let kanji;
const validate = async (req, res, next) => {
  kanji = new BaseController(Kanji)
  let action = req.url.split('/').pop();
  let schema = {};
  switch (action) {
    case "create": Joi.object({
      level: Joi.string().required(),
      kanji: Joi.string().required(),
      romaji: Joi.string().required(),
      kunyomi: Joi.string(),
      onyomi: Joi.string(),
      stroke: Joi.number().integer(),
      meaning: Joi.string(),
      created_by: Joi.number().integer().required(),
      updated_by: Joi.number().integer().required(),
    });
      break;
    case "update": Joi.object({
      id: Joi.number().integer().required(),
      level: Joi.string().required(),
      kanji: Joi.string().required(),
      romaji: Joi.string().required(),
      kunyomi: Joi.string(),
      onyomi: Joi.string(),
      stroke: Joi.number().integer(),
      meaning: Joi.string(),
      updated_by: Joi.number().integer().required(),
    });
      break;
    case "detail": Joi.object({
      id: Joi.number().integer().required(),
    });
      break;
    case "delete": Joi.object({
      id: Joi.number().integer().required(),
      deleted_by: Joi.number().integer().required(),
    });
      break;
    default:
      schema = {};
      break;
  }
  if (Object.keys(schema).length !== 0) {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const { code, status, formatedError } = kanji.formatValidationErrors(errors.details);
      res.json({ code, status, data: formatedError })
    } else {
      next();
    }
  } else {
    next();
  }
}

const create = async (req, res) => {
  try {
    const result = await kanji.create(req.body);
    const formatedResult = kanji.formatResponse(result, messages.created);
    res.status(httpStatusCode.CREATED).json(formatedResult)
  } catch (err) {
    handleError(res, err, errors.CREATE_ERROR)
  }
}
const update = async (req, res) => {
  try {
    const result = await kanji.update(req.body);
    if (result[0] === 0 || result === 0) {
      throw new ResourceNotFound(messages.failedToUpdate)
    } else {
      const updatedData = await kanji.handleUpdate(req.body.id)
      res.json(updatedData)
    }
  } catch (err) {
    handleError(res, err, errors.UPDATE_ERROR)
  }
}
const findAll = async (req, res) => {
  try {
    let result;
    if (req.query.level) {
      result = await kanji.findByLevel(
        "level",
        req.query.level,
        req.query,
        true
      );
    } else {
      result = await kanji.findAll(req.query);
    }
    res.json(result);
  } catch (err) {
    handleError(res, err, errors.RETRIEVE_ERROR)
  }
}
const findById = async (req, res) => {
  try {
    const result = await kanji.findById(req.body.id)
    console.log("result",result);
    if (result[0] === 0 || result === 0) {
      throw new ResourceNotFound();
    } else {
      const formatedResult = kanji.formatResponse(result);
      res.json(formatedResult)
    }
  } catch (err) {
    handleError(res, err, errors.RETRIEVE_ERROR)
  }
}
const deleteById = async (req, res) => {
  try {
    const result = await kanji.deleteById(req.body);
    if (result[0] === 0 || result === 0) {
      throw new ResourceNotFound(messages.failedToDelete)
    } else {
      const formatedResult = kanji.formatResponse(null, messages.deleted)
      res.json(formatedResult)
    }
  } catch (err) {
    handleError(res, err, errors.failedToDelete)
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