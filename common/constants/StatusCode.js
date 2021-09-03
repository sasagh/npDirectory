const StatusCode = {
    SUCCESS: 200,
    CREATE: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500
}

Object.freeze(StatusCode);

module.exports = StatusCode;