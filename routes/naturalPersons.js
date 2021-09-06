const express = require('express');
const {
    createNaturalPersonRequestValidationRules,
    updateNaturalPersonRequestValidationRules,
} = require('../middleware/requestValidator/rules/naturalPersonRequestValidationRules');
const validate = require('../middleware/requestValidator/requestValidator');
const router = express.Router();
const {
    getNaturalPersons,
    createNaturalPerson,
    getNaturalPersonById,
    updateNaturalPerson,
    deleteNaturalPerson
} = require('../controllers/naturalPersons');

router
    .route('/')
    .get(getNaturalPersons)
    .post(createNaturalPersonRequestValidationRules(), validate, createNaturalPerson);

router
    .route('/:id')
    .get(getNaturalPersonById)
    .put(updateNaturalPersonRequestValidationRules(), validate, updateNaturalPerson)
    .delete(deleteNaturalPerson);

module.exports = router;