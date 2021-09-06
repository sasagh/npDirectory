const { body } = require('express-validator');
const { validateRelationType } = require('../../../common/utils/validators');
const ValidationErrorMessage = require('../../../common/messages/ValidationErrorMessage');
const GlobalConstants = require('../../../common/constants/GlobalConstants');

exports.createRelationRequestValidationRules = () => {
    return [
        fromValidationRule,
        toValidationRule,
        relationTypeValidationRule
    ]
};

exports.updateRelationRequestValidationRules = () => relationTypeValidationRule;

const fromValidationRule =
    body(GlobalConstants.FROM_STRING)
        .notEmpty().withMessage(ValidationErrorMessage.REQUIRED).bail()
        .isString().withMessage(ValidationErrorMessage.STRING).bail()
        .trim();

const toValidationRule =
    body(GlobalConstants.TO_STRING)
        .notEmpty().withMessage(ValidationErrorMessage.REQUIRED).bail()
        .isString().withMessage(ValidationErrorMessage.STRING).bail()
        .trim();

const relationTypeValidationRule =
    body(GlobalConstants.RELATION_TYPE_STRING)
        .notEmpty().withMessage(ValidationErrorMessage.REQUIRED).bail()
        .isString().withMessage(ValidationErrorMessage.STRING).bail()
        .trim()
        .custom(validateRelationType)
            .withMessage(ValidationErrorMessage.RELATION_TYPE_FORMAT).bail();