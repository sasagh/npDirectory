const mongoose = require('mongoose');
const ValidationErrorMessage = require('../common/messages/ValidationErrorMessage');
const { validateRelationType } = require('../common/utils/validators');

const RelationSchema = new mongoose.Schema(
    {
        from: {
            type: mongoose.Schema.ObjectId,
            ref: 'NaturalPerson',
            required: [true, ValidationErrorMessage.REQUIRED],
        },

        to: {
            type: mongoose.Schema.ObjectId,
            ref: 'NaturalPerson',
            required: [true, ValidationErrorMessage.REQUIRED],
        },

        relationType: {
            type: String,
            required: [true, ValidationErrorMessage.REQUIRED],
            validate: {
                validator: (relationType) => validateRelationType(relationType),
                message: ValidationErrorMessage.RELATION_TYPE_FORMAT
            }
        }
    },
    {
        collection: 'relations'
    }
);

module.exports = mongoose.model('Relation', RelationSchema);