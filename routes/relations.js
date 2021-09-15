const express = require('express');
const {
    createRelationRequestValidator,
    updateRelationRequestValidator
} = require('../middleware/requestValidation/requestValidators/relationRequestValidators');
const {
    getRelations,
    createRelation,
    getRelationById,
    updateRelation,
    deleteRelation
} = require('../controllers/relations');
const router = express.Router();

router
    .route('/')
    .get(getRelations)
    .post(createRelationRequestValidator, createRelation);

router
    .route('/:id')
    .get(getRelationById)
    .patch(updateRelationRequestValidator, updateRelation)
    .delete(deleteRelation);

module.exports = router;