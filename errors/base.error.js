class BaseError extends Error {
    constructor(statusCode, status, data, description) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);
        this.code = statusCode;
        this.status = status;
        this.data = data;
        Error.captureStackTrace(this);
    }
}

module.exports = BaseError





