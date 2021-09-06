const GlobalConstants = require('../constants/GlobalConstants');

const ValidationErrorMessage = {
    MIN_LENGTH: `Value should be minimum ${GlobalConstants.NAME_MIN_LENGTH} characters long`,
    MAX_LENGTH: `Value should be maximum ${GlobalConstants.NAME_MAX_LENGTH} characters long`,
    REQUIRED: 'Field is required',
    STRING: 'Value must be string',
    DATE: 'Value must be date',
    ARRAY: 'Value must be array of strings',
    ONE_LANGUAGE_STRING: `Value must contain only one language letters (digits and special characters are not allowed)`,
    GENDER_FORMAT: 'Value value must be either \'male\' or \'female\'',
    PASSPORT_NUMBER_FORMAT: 'Value must contain digits only and must be 11 characters long',
    UNDER_AGE: 'You must be at least 18 years old',
    CONTACT_INFORMATION_FORMAT: 'Contact information should be phone number (pattern +995-5XX-XXX-XXX) or email address. Multiple items should be separated by comma (,)',
    RELATION_TYPE_FORMAT: 'Value must be \'relative\', \'colleague\', \'acquaintance\' or \'other\'',
    IMAGE_FORMAT: 'Field is required and file extension must be .png, jpeg or .gif',
}

Object.freeze(ValidationErrorMessage);

module.exports = ValidationErrorMessage;