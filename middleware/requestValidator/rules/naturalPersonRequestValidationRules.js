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

const createNaturalPersonRequestValidationRules = () => {
    return [
        body(GlobalConstants.NAME_STRING)
            .notEmpty().withMessage(ValidationErrorMessage.REQUIRED).bail()
            .isString().withMessage(ValidationErrorMessage.STRING).bail()
            .trim()
            .isLength({ min: GlobalConstants.NAME_MIN_LENGTH }).bail()
                .withMessage(ValidationErrorMessage.MIN_LENGTH)
            .isLength({ max: GlobalConstants.NAME_MAX_LENGTH }).bail()
                .withMessage(ValidationErrorMessage.NAME_MAX_LENGTH)
            .custom(validateName).bail()
                .withMessage(ValidationErrorMessage.ONE_LANGUAGE_STRING),

        body(GlobalConstants.SURNAME_STRING)
            .notEmpty().withMessage(ValidationErrorMessage.REQUIRED).bail()
            .isString().withMessage(ValidationErrorMessage.STRING).bail()
            .trim()
            .isLength({ min: GlobalConstants.NAME_MIN_LENGTH }).bail()
                .withMessage(ValidationErrorMessage.MIN_LENGTH)
            .isLength({ max: GlobalConstants.NAME_MAX_LENGTH }).bail()
                .withMessage(ValidationErrorMessage.NAME_MAX_LENGTH)
            .custom(validateName).bail()
                .withMessage(ValidationErrorMessage.ONE_LANGUAGE_STRING).bail(),

        body(GlobalConstants.GENDER_STRING)
            .notEmpty().withMessage(ValidationErrorMessage.REQUIRED).bail()
            .isString().withMessage(ValidationErrorMessage.STRING).bail()
            .trim()
            .custom(validateGender).withMessage(ValidationErrorMessage.GENDER_FORMAT).bail(),

        body(GlobalConstants.PASSPORT_NUMBER_STRING)
            .notEmpty().withMessage(ValidationErrorMessage.REQUIRED).bail()
            .isString().withMessage(ValidationErrorMessage.STRING).bail()
            .trim()
            .custom(validatePassportNumber).withMessage(ValidationErrorMessage.PASSPORT_NUMBER_FORMAT).bail(),

        body(GlobalConstants.BIRTH_DATE_STRING)
            .notEmpty().withMessage(ValidationErrorMessage.REQUIRED).bail()
            .isDate().withMessage(ValidationErrorMessage.DATE).bail()
            .custom(validateDate).withMessage(ValidationErrorMessage.UNDER_AGE).bail(),

        body(GlobalConstants.CITY_STRING)
            .notEmpty().withMessage(ValidationErrorMessage.REQUIRED).bail()
            .isString().withMessage(ValidationErrorMessage.STRING).bail(),

        body(GlobalConstants.CONTACT_INFORMATION_STRING).bail()
            .notEmpty().withMessage(ValidationErrorMessage.REQUIRED).bail()
            .isArray().withMessage(ValidationErrorMessage.ARRAY).bail()
            .custom(validateContactInformation).withMessage(ValidationErrorMessage.CONTACT_INFORMATION_FORMAT).bail(),

        //FIXME fix image validation
        //body(GlobalConstants.IMAGE_STRING)
        //    .custom(validateImage).withMessage(ValidationErrorMessage.IMAGE_FORMAT).bail()
    ]
}

exports.createNaturalPersonRequestValidationRules = createNaturalPersonRequestValidationRules;
exports.updateNaturalPersonRequestValidationRules = createNaturalPersonRequestValidationRules;