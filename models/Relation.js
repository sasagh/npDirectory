const mongoose = require('mongoose');

const RelationSchema = new mongoose.Schema(
    {
        from: {
            type: mongoose.Schema.ObjectId,
            ref: 'NaturalPerson',
        },

        to: {
            type: mongoose.Schema.ObjectId,
            ref: 'NaturalPerson',
        },

        relationType: String
    },
    {
        collection: 'relations'
    }
);

module.exports = mongoose.model('Relation', RelationSchema);