const express = require('express');
const {
    createNaturalPersonRequestValidationRules,
    updateNaturalPersonRequestValidationRules,
} = require('../middleware/requestValidator/rules/naturalPersonRequestValidationRules');
const validate = require('../middleware/requestValidator/requestValidator');
const {
    getNaturalPersons,
    createNaturalPerson,
    getNaturalPersonById,
    updateNaturalPerson,
    deleteNaturalPerson
} = require('../controllers/naturalPersons');
const router = express.Router();

router
    .route('/')
    .get(getNaturalPersons)
    .post(createNaturalPersonRequestValidationRules(), validate, createNaturalPerson);

router
    .route('/:id')
    .get(getNaturalPersonById)
    .patch(updateNaturalPersonRequestValidationRules(), validate, updateNaturalPerson)
    .delete(deleteNaturalPerson);

module.exports = router;