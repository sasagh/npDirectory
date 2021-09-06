const mongoose = require('mongoose');

const NaturalPersonSchema = new mongoose.Schema(
    {
        name: String,
        slug: String,
        surname: String,
        gender: String,
        passportNumber: String,
        birthDate: Date,
        city: String,
        contactInformation: [String],
        imageFileName: String,
    },
    {
        collection: 'naturalpersons'
    }
);

module.exports = mongoose.model('NaturalPerson', NaturalPersonSchema);