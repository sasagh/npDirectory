const express = require('express');
const {
    createRelationRequestValidationRules,
    updateRelationRequestValidationRules
} = require('../middleware/requestValidator/rules/relationRequestValidationRules');
const validate = require('../middleware/requestValidator/requestValidator');
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
    .post(createRelationRequestValidationRules(), validate, createRelation);

router
    .route('/:id')
    .get(getRelationById)
    .patch(updateRelationRequestValidationRules(), validate, updateRelation)
    .delete(deleteRelation);

module.exports = router;