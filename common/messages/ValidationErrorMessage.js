const ValidationErrorMessage = {
    required: (propName) => `Field \'${propName}\' is required`,
    minLength: (propName, minLength) => `Field \'${propName}\' should be minimum ${minLength} characters long`,
    maxLength: (propName, maxLength) => `Field \'${propName}\' should be maximum ${maxLength} characters long`,
    oneLanguageString: (propName) => `Field \'${propName}\' must contain only one language letters (digits and special characters are not allowed)`,
    genderFormat: () => 'Value of field \'gender\' must be either \'male\' or \'female\'',
    passportNumberFormat: () => 'Field \'passport\' number must contain digits only and must be 11 characters long',
    underAge: () => 'You must be at least 18 years old',
    contactInformationFormat: () => 'Contact information should be phone number (pattern +995-5XX-XXX-XXX) or email address. Multiple items should be separated by comma (,)',
}

Object.freeze(ValidationErrorMessage);

module.exports = ValidationErrorMessage;