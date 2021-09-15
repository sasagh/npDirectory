const express = require('express');
const {
    createNaturalPersonRequestValidator,
    updateNaturalPersonRequestValidator,
} = require('../middleware/requestValidation/requestValidators/naturalPersonRequestValidators');
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
    .post(createNaturalPersonRequestValidator, createNaturalPerson);

router
    .route('/:id')
    .get(getNaturalPersonById)
    .patch(updateNaturalPersonRequestValidator, updateNaturalPerson)
    .delete(deleteNaturalPerson);

module.exports = router;