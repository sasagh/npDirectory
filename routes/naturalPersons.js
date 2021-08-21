const express = require('express');
const router = express.Router();
const {
    getNaturalPersons,
    createNaturalPerson,
    getNaturalPersonById,
    updateNaturalPerson,
    deleteNaturalPerson } = require('../controllers/naturalPersons');

router
    .route('/')
    .get(getNaturalPersons)
    .post(createNaturalPerson);

router
    .route('/:id')
    .get(getNaturalPersonById)
    .put(updateNaturalPerson)
    .delete(deleteNaturalPerson);

module.exports = router;