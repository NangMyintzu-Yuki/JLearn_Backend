const { apiResponseHeader, errors, messages, httpStatusCode } = require("../utils/constant")
const BaseError = require('./base.error')

class AuthError extends BaseError {
    constructor(errorMsg = messages.loginFailed) {
        const { code, status, message } = apiResponseHeader(
            httpStatusCode.BAD_REQUEST,
            messages.failed,
            errorMsg
        );
        super(code, status, message, errors.LOGIN_ERROR)
    }
}
module.exports = AuthError;

    