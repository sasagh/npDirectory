const ValidationErrorMessage = {
    minLength: (minLength) => `should be minimum ${minLength} characters long`,
    maxLength: (maxLength) => `should be maximum ${maxLength} characters long`,
    REQUIRED: `is required`,
    ONE_LANGUAGE_STRING: `must contain only one language letters (digits and special characters are not allowed)`,
    GENDER_FORMAT: 'value must be either \'male\' or \'female\'',
    PASSPORT_NUMBER_FORMAT: 'value must contain digits only and must be 11 characters long',
    UNDER_AGE: 'You must be at least 18 years old',
    CONTACT_INFORMATION_FORMAT: 'Contact information should be phone number (pattern +995-5XX-XXX-XXX) or email address. Multiple items should be separated by comma (,)',
    RELATION_TYPE_FORMAT: 'value must be \'relative\', \'colleague\', \'acquaintance\' or \'other\'',
}

Object.freeze(ValidationErrorMessage);

module.exports = ValidationErrorMessage;