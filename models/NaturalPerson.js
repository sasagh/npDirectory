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
            required: [true, ValidationErrorMessage.required('name')],
            trim: true,
            minlength: [NAME_MIN_LENGTH, ValidationErrorMessage.minLength('name', NAME_MIN_LENGTH)],
            maxlength: [NAME_MAX_LENGTH, ValidationErrorMessage.maxLength('name', NAME_MAX_LENGTH)],
            validate: {
                validator: (name) => validateName(name),
                message: ValidationErrorMessage.oneLanguageString('name')
            }
        },

        slug: String,

        surname: {
            type: String,
            required: [true, ValidationErrorMessage.required('surname')],
            trim: true,
            minlength: [NAME_MIN_LENGTH, ValidationErrorMessage.minLength('surname', NAME_MIN_LENGTH)],
            maxlength: [NAME_MAX_LENGTH, ValidationErrorMessage.maxLength('surname', NAME_MAX_LENGTH)],
            validate: {
                validator: (surname) => validateName(surname),
                message: ValidationErrorMessage.oneLanguageString('surname')
            }
        },

        gender: {
            type: String,
            required: [true, ValidationErrorMessage.required('gender')],
            validate: {
                validator: (gender) => validateGender(gender),
                message: ValidationErrorMessage.genderFormat()
            }
        },

        passportNumber: {
            type: String,
            required: [true, ValidationErrorMessage.required('passportNumber')],
            validate: {
                validator: (passportNumber) => validatePassportNumber(passportNumber),
                message: ValidationErrorMessage.passportNumberFormat()
            }
        },

        birthDate: {
            type: Date,
            required: [true, ValidationErrorMessage.required('birthDate')],
            validate: {
                validator: (birthDate) => validateDate(birthDate),
                message: ValidationErrorMessage.underAge()
            }
        },

        city: {
            type: String,
            required: [true, ValidationErrorMessage.required('city')]
        },

        contactInformation: {
            type: [String],
            required: [true, ValidationErrorMessage.required('contactInformation')],
            validate: {
                validator: (contactInformation) => validateContactInformation(contactInformation),
                message: ValidationErrorMessage.contactInformationFormat()
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