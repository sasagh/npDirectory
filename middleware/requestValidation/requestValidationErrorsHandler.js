const { validationResult } = require('express-validator');
const StatusCode = require('../../common/enum/StatusCode');

const requestValidationErrorsHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty())
    return next();

  const extractedErrors = []
  errors.array().map(err => extractedErrors.push(`${[err.param]}: ${err.msg}`))

  return res.status(StatusCode.NOT_FOUND).json({
    errors: extractedErrors,
  })
}

module.exports = requestValidationErrorsHandler;