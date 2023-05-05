const Joi = require('joi')
const BaseController = require('./base.controller')
const { Operator } = require('../models')
const { messages, httpStatusCode, errors } = require('../utils/constant')
const ResourceNotFound = require("../errors/resource_not_found.error")
const { generateHash } = require('../services/auth.services')
const { Op } = require('sequelize')
const handleError = require('../errors/handle_error')

let operator;
const validate = async (req, res, next) => {
  operator = new BaseController(Operator)
  let action = req.url.split('/').pop();
  let schema = {};
  switch (action) {
    case "create": Joi.object({
      role_id: Joi.number().integer().required(),
      fullname: Joi.string(),
      username: Joi.string(),
      phone: Joi.string(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      active: Joi.number().integer().required(),
      created_by: Joi.number().integer().required(),
      updated_by: Joi.number().integer(),
    });
      break;
    case "update":
      schema = Joi.object({
        id: Joi.number().integer().required(),
        role_id: Joi.number().integer(),
        fullname: Joi.string(),
        username: Joi.string(),
        phone: Joi.string(),
        email: Joi.string(),
        password: Joi.string(),
        active: Joi.number().integer(),
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
      break;
  }
  if (Object.keys(schema).length !== 0) {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const { code, status, formatedError } = operator.formatValidationErrors(error.details);
      res.json({ code, status, data: formatedError })
    } else {
      next();
    }
  }
  else {
    next();
  }
}
const create = async (req, res) => {
  try {
    req.body.password = await generateHash(req.body.password);

    const result = await Operator.findOne({
      where: {
        email: req.body.email
      },
      paranoid: false
    })
    if (result === null) {
      const result = await operator.create(req.body);
      const formatedResult = operator.formatResponse(result, messages.created);
      res.status(httpStatusCode.CREATED).json(formatedResult)
    } else {
      if (result.deleted_at === null) {
        res.status(httpStatusCode.CONFLICT).json({
          code: httpStatusCode.CONFLICT,
          status: messages.failed,
          message: errors.ALREADY_EXIST
        })
      } else {
        // console.log('upsert)
      }
    }


  } catch (err) {
    handleError(res, err, errors.CREATE_ERROR)
  }
}

const update = async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = await generateHash(req.body.password)
    }
    const result = await operator.update(req.body);
    if (result[0] === 0) {
      throw new ResourceNotFound(messages.failedToUpdate);
    } else {
      const updatedData = await operator.handleUpdate(req.body.id)
      updatedData.data.dataValues.Role = await updatedData.data.getRole();
      res.json(updatedData)
    }
  } catch (err) {
    handleError(res, err, errors.UPDATE_ERROR)
  }
}
const findAll = async (req, res) => {
  try {
    const result = await operator.findAll(req.query);
    res.json(result);
  } catch (err) {
    handleError(res, err, errors.RETRIEVE_ERROR)
  }
}
const findById = async (req, res) => {
  try {
    const result = await operator.findById(req.body.id);
    if (result === null) {
      throw new ResourceNotFound();
    } else {
      const formatedResult = operator.formatResponse(result);
      res.json(formatedResult)
    }
  } catch (err) {
    handleError(res, err, errors.RETRIEVE_ERROR)
  }
}
const deleteById = async (req, res) => {
  try {
    const result = await operator.deleteById(req.body);
    if (result === 0) {
      throw new ResourceNotFound(messages.failedToDelete)
    } else {
      const formatedResult = operator.formatResponse(null, messages.deleted);
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