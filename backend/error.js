class ModelError extends Error {
    constructor(statusCode, ...args) {
        super(...args);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, ModelError);
    }

    toJSON() {
        return {
            statusCode: this.statusCode,
            message: this.message,
        }
    }
}

module.exports = ModelError;
