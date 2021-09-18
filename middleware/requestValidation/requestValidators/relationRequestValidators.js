const { check } = require('express-validator');
const { validateRelationType } = require('../../../common/utils/validators');
const ValidationErrorMessage = require('../../../common/messages/ValidationErrorMessage');
const GlobalConstants = require('../../../common/constants/GlobalConstants');
const requestValidationErrorsHandler = require('../requestValidationErrorsHandler');

const checkFrom = (isOptional) => {
    const ch = check(GlobalConstants.FROM_STRING)
        .notEmpty().withMessage(ValidationErrorMessage.REQUIRED).bail()
        .isString().withMessage(ValidationErrorMessage.STRING).bail()
        .trim();

    return isOptional ? ch.optional() : ch;
}


const checkTo = (isOptional) => {
    const ch = check(GlobalConstants.TO_STRING)
        .notEmpty().withMessage(ValidationErrorMessage.REQUIRED).bail()
        .isString().withMessage(ValidationErrorMessage.STRING).bail()
        .trim();

    return isOptional ? ch.optional() : ch;
}

const checkRelationType = (isOptional) => {
    const ch = check(GlobalConstants.RELATION_TYPE_STRING)
        .notEmpty().withMessage(ValidationErrorMessage.REQUIRED).bail()
        .isString().withMessage(ValidationErrorMessage.STRING).bail()
        .trim()
        .custom(validateRelationType)
            .withMessage(ValidationErrorMessage.RELATION_TYPE_FORMAT).bail();

    return isOptional ? ch.optional() : ch;
}

const checkerFunctions = [
    checkFrom,
    checkTo,
    checkRelationType
]

exports.createRelationRequestValidator = [
    Array.from(checkerFunctions, el => el(false)),
    requestValidationErrorsHandler
]

exports.updateRelationRequestValidator = [
    [checkRelationType(false)],
    requestValidationErrorsHandler
]