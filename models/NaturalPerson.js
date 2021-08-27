const mongoose = require('mongoose');
const errorMessage = require('../common/messages/errorMessage');
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
            required: [true, errorMessage.required('name')],
            trim: true,
            minlength: [NAME_MIN_LENGTH, errorMessage.minLength('name', NAME_MIN_LENGTH)],
            maxlength: [NAME_MAX_LENGTH, errorMessage.maxLength('name', NAME_MAX_LENGTH)],
            validate: {
                validator: (name) => validateName(name),
                message: errorMessage.oneLanguageString('name')
            }
        },

        slug: String,

        surname: {
            type: String,
            required: [true, errorMessage.required('surname')],
            trim: true,
            minlength: [NAME_MIN_LENGTH, errorMessage.minLength('surname', NAME_MIN_LENGTH)],
            maxlength: [NAME_MAX_LENGTH, errorMessage.maxLength('surname', NAME_MAX_LENGTH)],
            validate: {
                validator: (surname) => validateName(surname),
                message: errorMessage.oneLanguageString('surname')
            }
        },

        gender: {
            type: String,
            required: [true, errorMessage.required('gender')],
            validate: {
                validator: (gender) => validateGender(gender),
                message: errorMessage.genderFormat()
            }
        },

        passportNumber: {
            type: String,
            required: [true, errorMessage.required('passportNumber')],
            validate: {
                validator: (passportNumber) => validatePassportNumber(passportNumber),
                message: errorMessage.passportNumberFormat()
            }
        },

        birthDate: {
            type: Date,
            required: [true, errorMessage.required('birthDate')],
            validate: {
                validator: (birthDate) => validateDate(birthDate),
                message: errorMessage.underAge()
            }
        },

        city: {
            type: String,
            required: [true, errorMessage.required('city')]
        },

        contactInformation: {
            type: [String],
            required: [true, errorMessage.required('contactInformation')],
            validate: {
                validator: (contactInformation) => validateContactInformation(contactInformation),
                message: errorMessage.contactInformationFormat()
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