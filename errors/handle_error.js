const ResourceNotFound = require('./resource_not_found.error')
const { UniqueConstraintError } = require('sequelize')
const logger = require('../logs/logger')
const {
    httpStatusCode,
    messages,
    errors,
    apiResponseHeader
} = require('../utils/constant')
const AuthError = require('./auth.error')

const handleError = (res, e, errMsg) => {
    let formatResponse;
    logger.error(`${e.message}`);
    if (e instanceof ResourceNotFound) {
        res.status(httpStatusCode.BAD_REQUEST).json(e);
    } else if (e instanceof UniqueConstraintError) {
        formatResponse = apiResponseHeader(
            httpStatusCode.CONFLICT,
            messages.failed,
            errors.ALREADY_EXIST
        );
        res.status(httpStatusCode.CONFLICT).json(formatResponse)
    }
    else if (e instanceof AuthError) {
        res.status(httpStatusCode.OK).json(e);
    } else {
        formatResponse = apiResponseHeader(
            httpStatusCode.INTERNAL_SERVER,
            messages.failed,
            errMsg
        );
        res.status(httpStatusCode.INTERNAL_SERVER).json(formatResponse)
    }
}
module.exports = handleError

