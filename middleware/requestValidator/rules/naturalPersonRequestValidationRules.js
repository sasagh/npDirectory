const { body } = require('express-validator');
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

//TODO add nosql injection security

exports.createNaturalPersonRequestValidationRules = () => {
    return [
        nameValidationRules,
        surnameValidationRules,
        genderValidationRules,
        passportNumberValidationRules,
        birthDateValidationRules,
        cityValidationRules,
        contactInformationValidationRules,
        //imageValidationRules
    ]
}

exports.updateNaturalPersonRequestValidationRules = () =>
    Array.from(this.createNaturalPersonRequestValidationRules(), rule => rule.optional());

const nameValidationRules =
    body(GlobalConstants.NAME_STRING)
        .notEmpty().withMessage(ValidationErrorMessage.REQUIRED).bail()
        .isString().withMessage(ValidationErrorMessage.STRING).bail()
        .trim()
        .isLength({ min: GlobalConstants.NAME_MIN_LENGTH }).bail()
            .withMessage(ValidationErrorMessage.MIN_LENGTH)
        .isLength({ max: GlobalConstants.NAME_MAX_LENGTH }).bail()
            .withMessage(ValidationErrorMessage.NAME_MAX_LENGTH)
        .custom(validateName).bail()
            .withMessage(ValidationErrorMessage.ONE_LANGUAGE_STRING);

const surnameValidationRules =
    body(GlobalConstants.SURNAME_STRING)
        .notEmpty().withMessage(ValidationErrorMessage.REQUIRED).bail()
        .isString().withMessage(ValidationErrorMessage.STRING).bail()
        .trim()
        .isLength({ min: GlobalConstants.NAME_MIN_LENGTH }).bail()
            .withMessage(ValidationErrorMessage.MIN_LENGTH)
        .isLength({ max: GlobalConstants.NAME_MAX_LENGTH }).bail()
            .withMessage(ValidationErrorMessage.NAME_MAX_LENGTH)
        .custom(validateName).bail()
            .withMessage(ValidationErrorMessage.ONE_LANGUAGE_STRING).bail();

const genderValidationRules =
    body(GlobalConstants.GENDER_STRING)
        .notEmpty().withMessage(ValidationErrorMessage.REQUIRED).bail()
        .isString().withMessage(ValidationErrorMessage.STRING).bail()
        .trim()
        .custom(validateGender).withMessage(ValidationErrorMessage.GENDER_FORMAT).bail();

const passportNumberValidationRules =
    body(GlobalConstants.PASSPORT_NUMBER_STRING)
        .notEmpty().withMessage(ValidationErrorMessage.REQUIRED).bail()
        .isString().withMessage(ValidationErrorMessage.STRING).bail()
        .trim()
        .custom(validatePassportNumber).withMessage(ValidationErrorMessage.PASSPORT_NUMBER_FORMAT).bail();

const birthDateValidationRules =
    body(GlobalConstants.BIRTH_DATE_STRING)
        .notEmpty().withMessage(ValidationErrorMessage.REQUIRED).bail()
        .isDate().withMessage(ValidationErrorMessage.DATE).bail()
        .custom(validateDate).withMessage(ValidationErrorMessage.UNDER_AGE).bail();

const cityValidationRules =
    body(GlobalConstants.CITY_STRING)
        .notEmpty().withMessage(ValidationErrorMessage.REQUIRED).bail()
        .isString().withMessage(ValidationErrorMessage.STRING).bail();

const contactInformationValidationRules =
    body(GlobalConstants.CONTACT_INFORMATION_STRING).bail()
        .notEmpty().withMessage(ValidationErrorMessage.REQUIRED).bail()
        .isArray().withMessage(ValidationErrorMessage.ARRAY).bail()
        .custom(validateContactInformation)
            .withMessage(ValidationErrorMessage.CONTACT_INFORMATION_FORMAT).bail();

//FIXME fix image validation
const imageValidationRules =
    body(GlobalConstants.IMAGE_STRING)
        .custom(validateImage).withMessage(ValidationErrorMessage.IMAGE_FORMAT).bail();