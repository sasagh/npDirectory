const express = require('express');
const router = express.Router();
const {
    getRelations,
    createRelation,
    getRelationById,
    updateRelation,
    deleteRelation
} = require('../controllers/relations');

router
    .route('/')
    .get(getRelations)
    .post(createRelation);

router
    .route('/:id')
    .get(getRelationById)
    .put(updateRelation)
    .delete(deleteRelation);

module.exports = router;