const NaturalPerson = require('../models/NaturalPerson');
const asyncHandler = require('../middleware/asyncHandler');
const StatusCode = require('../common/constants/StatusCode');
const ErrorMessage = require('../common/messages/ErrorMessage');
const ErrorResponse = require('../common/utils/ErrorResponse');
const OkResponse = require('../common/utils/OkResponse');

const NATURAL_PERSON = 'Natural person';

exports.getNaturalPersons = asyncHandler(async (req, res, next) => {
    const naturalPersons = await NaturalPerson.find();

    res.status(StatusCode.SUCCESS).json(new OkResponse(naturalPersons));
});

exports.createNaturalPerson = asyncHandler(async (req, res, next) => {
    const naturalPerson = await NaturalPerson.create(req.body);

    res.status(StatusCode.CREATE).json(new OkResponse(naturalPerson));
});

exports.getNaturalPersonById = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const naturalPerson = await NaturalPerson.findById(id);

    if(!naturalPerson){
        return next(new ErrorResponse(ErrorMessage.idNotFound(NATURAL_PERSON, id), StatusCode.NOT_FOUND));
    }
    
    res.status(200).json(new OkResponse(naturalPerson));
});

exports.updateNaturalPerson = async (req, res, next) => {
    const naturalPerson = await NaturalPerson.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if(!naturalPerson){
        return next(new ErrorResponse(ErrorMessage.idNotFound(NATURAL_PERSON, id), StatusCode.NOT_FOUND));
    }

    res.status(200).json(new OkResponse(naturalPerson));
}

exports.deleteNaturalPerson = async (req, res, next) => {
    const naturalPerson = await NaturalPerson.findByIdAndDelete(req.params.id);

    if(!naturalPerson){
        return next(new ErrorResponse(ErrorMessage.idNotFound(NATURAL_PERSON, id), StatusCode.NOT_FOUND));
    }

    res.status(200).json(new OkResponse(naturalPerson));
}

