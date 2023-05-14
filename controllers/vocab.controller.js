const Joi = require('joi')
const BaseController = require('./base.controller');
const { Vocab } = require('../models')
const { messages, httpStatusCode, errors } = require('../utils/constant')
const ResourceNotFound = require('../errors/resource_not_found.error')
const handleError = require('../errors/handle_error')

let vocab;

const validate = async (req, res, next) => {
  vocab = new BaseController(Vocab)
  let action = req.url.split('/').pop();
  let schema = {};
  switch (action) {
    case "create": Joi.object({
      level: Joi.string().required(),
      kanji_id: Joi.number().integer(),
      kanji: Joi.string(),
      furigana: Joi.string().required(),
      romaji: Joi.string().required(),
      type: Joi.string(),
      meaning: Joi.string().required(),
      created_by: Joi.number().integer().required(),
      updated_by: Joi.number().integer().required(),
    });
      break;
    case "update": Joi.object({
      id: Joi.number().integer().required(),
      level: Joi.string(),
      kanji_id: Joi.number().integer(),
      kanji: Joi.string(),
      furigana: Joi.string(),
      romaji: Joi.string(),
      type: Joi.string(),
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
    const { error } = schema.validate(req.body, { abortEarly: false })
    if (error) {
      const { code, status, formatedError } = vocab.formatValidationErrors(errors.details)
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
    const result = await vocab.create(req.body)
    console.log("result ==>", result)
    const formatedResult = vocab.formatResponse(result, messages.created)
    res.status(httpStatusCode.CREATED).json(formatedResult)
  } catch (err) {
    handleError(res, err, errors.CREATE_ERROR)
  }
}

const update = async (req, res) => {
  try {
    const result = await vocab.update(req.body);
    if (result[0] === 0 || result === 0) {
      throw new ResourceNotFound(messages.failedToUpdate)
    } else {
      const updatedData = await vocab.handleUpdate(req.body.id);
      res.json(updatedData)
    }
  } catch (err) {
    handleError(res, err, errors.UPDATE_ERROR)
  }
}
const findAll = async (req, res) => {
  try {
    const result = await vocab.findAll(req.query);
    console.log("findAll", result)
    res.json(result);
  } catch (err) {
    handleError(res, err, errors.RETRIEVE_ERROR)
  }
}
const findById = async (req, res) => {
  try {
    const result = await vocab.findById(req.body.id)
    console.log('result',result)
    if (result === null || result[0] === 0 || result === 0) {
      throw new ResourceNotFound();
    } else {
      result.dataValues.Kanji = await result.getKanji();

      const formatedResult = vocab.formatResponse(result)
      res.json(formatedResult)
    }
  } catch (err) {
    handleError(res, err, errors.RETRIEVE_ERROR)
  }
}
const deleteById = async (req, res) => {
  try {
    const result = await vocab.deleteById(req.body);
    if (result[0] === 0 || result === 0) {
      throw new ResourceNotFound(messages.failedToDelete)
    } else {
      const formatedResult = vocab.formatResponse(null, messages.deleted)
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
  validate
}