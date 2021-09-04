const mongoose = require('mongoose');
const ValidationErrorMessage = require('../common/messages/ValidationErrorMessage');
const {
    validateName,
    validateGender,
    validatePassportNumber,
    validateDate,
    validateContactInformation
} = require('../common/utils/validators');

const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 50;

const NaturalPersonSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, ValidationErrorMessage.REQUIRED],
            trim: true,
            minlength: [NAME_MIN_LENGTH, ValidationErrorMessage.minLength(NAME_MIN_LENGTH)],
            maxlength: [NAME_MAX_LENGTH, ValidationErrorMessage.maxLength(NAME_MAX_LENGTH)],
            validate: {
                validator: (name) => validateName(name),
                message: ValidationErrorMessage.ONE_LANGUAGE_STRING
            }
        },

        slug: String,

        surname: {
            type: String,
            required: [true, ValidationErrorMessage.REQUIRED],
            trim: true,
            minlength: [NAME_MIN_LENGTH, ValidationErrorMessage.minLength(NAME_MIN_LENGTH)],
            maxlength: [NAME_MAX_LENGTH, ValidationErrorMessage.maxLength(NAME_MAX_LENGTH)],
            validate: {
                validator: (surname) => validateName(surname),
                message: ValidationErrorMessage.ONE_LANGUAGE_STRING
            }
        },

        gender: {
            type: String,
            required: [true, ValidationErrorMessage.REQUIRED],
            validate: {
                validator: (gender) => validateGender(gender),
                message: ValidationErrorMessage.GENDER_FORMAT
            }
        },

        passportNumber: {
            type: String,
            required: [true, ValidationErrorMessage.REQUIRED],
            validate: {
                validator: (passportNumber) => validatePassportNumber(passportNumber),
                message: ValidationErrorMessage.PASSPORT_NUMBER_FORMAT
            }
        },

        birthDate: {
            type: Date,
            required: [true, ValidationErrorMessage.REQUIRED],
            validate: {
                validator: (birthDate) => validateDate(birthDate),
                message: ValidationErrorMessage.UNDER_AGE
            }
        },

        city: {
            type: String,
            required: [true, ValidationErrorMessage.REQUIRED],
        },

        contactInformation: {
            type: [String],
            required: [true, ValidationErrorMessage.REQUIRED],
            validate: {
                validator: (contactInformation) => validateContactInformation(contactInformation),
                message: ValidationErrorMessage.CONTACT_INFORMATION_FORMAT
            }
        },

        imageFileName: {
            type: String
        }
    },
    {
        collection: 'naturalpersons'
    }
);

module.exports = mongoose.model('NaturalPerson', NaturalPersonSchema);