const Joi = require('joi')
const BaseController = require('./base.controller')
const { User } = require('../models')
const { messages, httpStatusCode, errors } = require('../utils/constant')
const ResourceNotFound = require("../errors/resource_not_found.error")
const { generateHash } = require("../services/auth.services")
const { Op } = require('sequelize')
const handleError = require("../errors/handle_error");


let user;
const validate = async (req, res, next) => {
    user = new BaseController(User);
    let action = req.url.split('/').pop();
    let schema = {};
    switch (action) {
        case "create":
            schema = Joi.object({
                role_id: Joi.number().integer().required(),
                fullname: Joi.string(),
                username: Joi.string(),
                phone: Joi.string(),
                email: Joi.string().required(),
                password: Joi.string().required(),
                active: Joi.number().integer().required(),
                address: Joi.string(),
                register_date: Joi.string(),
                profile: Joi.string(),
                // profile: Joi.string().dataUri(),
                created_by: Joi.number().integer().required(),
                updated_by: Joi.number().integer().required()
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
                address: Joi.string(),
                register_date: Joi.string(),
                profile: Joi.string(),
                // profile: Joi.string().dataUri(),
                updated_by: Joi.number().integer().required()
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
    if (Object.keys(schema).length !== 0) {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const { code, status, formatedError } = user.formatValidationErrors(error.details)
            res.json({ code, status, data: formatedError })
        }
        else {
            next();
        }
    } else {
        next();
    }

}

const create = async (req, res) => {
    try {

        req.body.password = await generateHash(req.body.password);
        const result = await user.create(req.body);
        console.log(result)
        const formatedResult = user.formatResponse(result, messages.created);
        res.status(httpStatusCode.CREATED).json(formatedResult)
        // hash password
        // req.body.password = await generateHash(req.body.password);
        // const result = await User.findOne({
        //     where: { email: req.body.email },
        //     paranoid: false,
        // });
        // console.log("result =>", result);
        // if (result === null) {
        //     let newResult = await user.create(req.body);
        //     console.log("new Result=>", newResult);
        //     const formatedResult = user.formatResponse(newResult, messages.created);
        //     res.status(httpStatusCode.CREATED).json(formatedResult);
        // }
        // else {
        //     if (result.deleted_at === null) {
        //         console.log("already exist")
        //         res.status(httpStatusCode.CONFLICT).json({
        //             code: httpStatusCode.CONFLICT,
        //             status: messages.failed,
        //             message: errors.ALREADY_EXIST
        //         })
        //     }
        //     else {
        //         console.log("upsert");
        //     }
        // }

    } catch (e) {
        handleError(res, e, errors.CREATE_ERROR);
    }
}
const update = async (req, res) => {
    try {
        if (req.body.password) {
            req.body.password = await generateHash(req.body.password);
        }
        const result = await user.update(req.body);
        if (result[0] === 0) {
            throw new ResourceNotFound(messages.failedToUpdate);
        } else {
            const updatedData = await user.handleUpdate(req.body.id)
            updatedData.data.dataValues.Role = await updatedData.data.getRole()
            res.json(updatedData);
        }
    } catch (e) {
        handleError(res, e, errors.UPDATE_ERROR)
    }
}
const findAll = async (req, res) => {
    try {
        const result = await user.findAll(req.query);
        res.json(result)
    } catch (e) {
        handleError(res, e, errors.RETRIEVE_ERROR)
    }
}
const findById = async (req, res) => {
    try {
        const result = await user.findById(req.body.id);
        if (result === null) {
            throw new ResourceNotFound();
        } else {
            const formatedResult = user.formatResponse(result);
            res.json(formatedResult);
        }
    } catch (e) {
        handleError(res, e, errors.RETRIEVE_ERROR)
    }
}
const deleteById = async (req, res) => {
    try {
        const result = await user.deleteById(req.body);
        if (result === 0) {
            throw new ResourceNotFound(messages.failedToDelete)
        }
        else {
            const formatedResult = user.formatResponse(null, messages.deleted);
            res.json(formatedResult);
        }
    } catch (e) {
        handleError(res, e, errors.DELETE_ERROR)
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

