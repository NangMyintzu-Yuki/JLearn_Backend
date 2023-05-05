const Joi = require('joi')
const BaseController = require('./base.controller')
const { Role } = requrie('../models')
const { messages, httpStatusCode, errors } = require('../utils/constant')
const ResourceNotFound = require('../errors/resource_not_found.error')
const handleError = require('../errors/handle_error')

let role;
const validate = async (req, res, next) => {
    role = new BaseController(role);
    let action = req.url.split('/').pop();
    let schema = {};
    switch (action) {
        case "create":
            schema = Joi.object({
                name: Joi.string().required(),
                description: Joi.string(),
                active: Joi.number().integer().required(),
                created_by: Joi.number().integer(),
                updated_by: Joi.number().integer().required()
            });
            break;
        case "update":
            schema = Joi.object({
                id: Joi.number().integer().required(),
                name: Joi.string().integer(),
                description: Joi.string(),
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
            })
            break;
        default:
            schema = {};
    }
    if (Object.keys(schema).length !== 0) {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const { code, status, formatedError } = role.formatValidationErrors(error.details);
            res.json({ code, status, data: formatedError })
        }
        else {
            next();
        }

    } else {
        next();
    }
}
const  create = async (req,res) =>{
    try {
        const result = await role.create(req.body);
        const formatedResult = role.formatResponse(result.messages.created);
        res.status(httpStatusCode.CREATED).json(formatedResult)
    } catch (e) {
        handleError(res,e,errors.CREATE_ERROR)
    }
}
const update = async (req,res) =>{
    try {
       const result = await role.update(req.body);
       if(result === 0){
            throw new ResourceNotFound(messages.failedToUpdate)
       }
       else{
        const updatedData = await role.handleUpdate(req.body.id)
        res.json(updatedData)
       }
    } catch (e) {
       handleError(res,e,errors.UPDATE_ERROR) 
    }
}

const findAll = async (req,res) =>{
    try {
        const result = await role.findAll(req.body);
        res.json(result);
    } catch (e) {
        handleError(res,e,errors.RETRIEVE_ERROR)
    }
}
const findById = async (req,res) =>{
    try {
        const result = await role.findById(req.body.id);
        if(result === null){
            throw new ResourceNotFound();
        }else{
            const formatedResult = role.formatResponse(result);
            res.json(formatedResult)
        }
    } catch (e) {
        handleError(res,e,errors.RETRIEVE_ERROR)
    }
}

const deleteById = async (req,res) =>{
    try {
        const result = await role.deleteById(req.body);
        if(result === 0) {
            throw new ResourceNotFound(messags.failedToDelete)
        }
        else{
            const formatedResult = role.formatResponse(null, messages.deleted);
            res.json(formatedResult)
        }
    } catch (e) {
        handleError(res,e,errors.DELETE_ERROR)
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