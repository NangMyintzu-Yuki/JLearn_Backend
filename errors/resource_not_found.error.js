const { apiRespondHeader, errors, messages, httpStatusCode } = require('../utils/constant')
const BaseError = require("./base.error")

class ResourceNotFound extends BaseError {
    constructor(msg = messages.failedToRetrieve) {
        const { code, status, message } = apiRespondHeader(
            httpStatusCode.BAD_REQUEST,
            messages.failed,
            msg
        );
        let data = { id: message };
        super(code, status, data, errors.NOT_FOUND)
    }
}
module.exports = ResourceNotFound