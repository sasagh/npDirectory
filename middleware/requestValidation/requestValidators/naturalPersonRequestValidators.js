const { check } = require('express-validator');
const {
    validateName,
    validateGender,
    validatePassportNumber,
    validateDate,
    validateContactInformation,
    validateImage
} = require('../../../common/utils/validators');
const ValidationErrorMessage = require('../../../common/messages/ValidationErrorMessage');
const GlobalConstants = require('../../../common/constants/GlobalConstants');
const requestValidationErrorsHandler = require('../requestValidationErrorsHandler');
const imageHandler = require('../imageHandler');

//TODO add nosql injection security

const checkName = (isOptional) => {
    const ch = check(GlobalConstants.NAME_STRING)
        .notEmpty().withMessage(ValidationErrorMessage.REQUIRED).bail()
        .isString().withMessage(ValidationErrorMessage.STRING).bail()
        .trim()
        .isLength({ min: GlobalConstants.NAME_MIN_LENGTH }).bail()
        .withMessage(ValidationErrorMessage.MIN_LENGTH)
        .isLength({ max: GlobalConstants.NAME_MAX_LENGTH }).bail()
        .withMessage(ValidationErrorMessage.MAX_LENGTH)
        .custom(validateName).bail()
        .withMessage(ValidationErrorMessage.ONE_LANGUAGE_STRING)

    return isOptional ? ch.optional() : ch;
}

const checkSurname = (isOptional) => {
    const ch = check(GlobalConstants.SURNAME_STRING)
        .notEmpty().withMessage(ValidationErrorMessage.REQUIRED).bail()
        .isString().withMessage(ValidationErrorMessage.STRING).bail()
        .trim()
        .isLength({ min: GlobalConstants.NAME_MIN_LENGTH }).bail()
        .withMessage(ValidationErrorMessage.MIN_LENGTH)
        .isLength({ max: GlobalConstants.NAME_MAX_LENGTH }).bail()
        .withMessage(ValidationErrorMessage.MAX_LENGTH)
        .custom(validateName).bail()
        .withMessage(ValidationErrorMessage.ONE_LANGUAGE_STRING).bail();

    return isOptional ? ch.optional() : ch;
}

const checkGender = (isOptional) => {
    const ch = check(GlobalConstants.GENDER_STRING)
        .notEmpty().withMessage(ValidationErrorMessage.REQUIRED).bail()
        .isString().withMessage(ValidationErrorMessage.STRING).bail()
        .trim()
        .custom(validateGender).withMessage(ValidationErrorMessage.GENDER_FORMAT).bail();

    return isOptional ? ch.optional() : ch;
}

const checkPassportNumber = (isOptional) => {
    const ch = check(GlobalConstants.PASSPORT_NUMBER_STRING)
        .notEmpty().withMessage(ValidationErrorMessage.REQUIRED).bail()
        .isString().withMessage(ValidationErrorMessage.STRING).bail()
        .trim()
        .custom(validatePassportNumber).withMessage(ValidationErrorMessage.PASSPORT_NUMBER_FORMAT).bail();

    return isOptional ? ch.optional() : ch;
}

const checkBirthDate = (isOptional) => {
    const ch = check(GlobalConstants.BIRTH_DATE_STRING)
        .notEmpty().withMessage(ValidationErrorMessage.REQUIRED).bail()
        .isDate().withMessage(ValidationErrorMessage.DATE).bail()
        .custom(validateDate).withMessage(ValidationErrorMessage.UNDER_AGE).bail();

    return isOptional ? ch.optional() : ch;
}

const checkCity = (isOptional) => {
    const ch = check(GlobalConstants.CITY_STRING)
        .notEmpty().withMessage(ValidationErrorMessage.REQUIRED).bail()
        .isString().withMessage(ValidationErrorMessage.STRING).bail();

    return isOptional ? ch.optional() : ch;
}

const checkContactInformation = (isOptional) => {
    const ch = check(GlobalConstants.CONTACT_INFORMATION_STRING).bail()
        .notEmpty().withMessage(ValidationErrorMessage.REQUIRED).bail()
        .isArray().withMessage(ValidationErrorMessage.ARRAY).bail()
        .custom(validateContactInformation)
        .withMessage(ValidationErrorMessage.CONTACT_INFORMATION_FORMAT).bail();

    return isOptional ? ch.optional() : ch;
}

const checkImage = (isOptional) => {
    const ch = check(GlobalConstants.IMAGE_STRING)
        .custom(validateImage).withMessage(ValidationErrorMessage.IMAGE_FORMAT).bail();

    return isOptional ? ch.optional() : ch;
}

const checkerFunctions = [
    checkName,
    checkSurname,
    checkGender,
    checkPassportNumber,
    checkBirthDate,
    checkCity,
    checkContactInformation,
    checkImage
]

exports.createNaturalPersonRequestValidator = [
    imageHandler,
    Array.from(checkerFunctions, el => el(false)),
    requestValidationErrorsHandler
];

exports.updateNaturalPersonRequestValidator = [
    imageHandler,
    Array.from(checkerFunctions, el => el(true)),
    requestValidationErrorsHandler
];