const NaturalPerson = require('../models/NaturalPerson');
const Relations = require('../models/Relation');
const asyncHandler = require('../middleware/asyncHandler');
const StatusCode = require('../common/enum/StatusCode');
const ErrorMessage = require('../common/messages/ErrorMessage');
const ErrorResponse = require('../common/utils/ErrorResponse');
const OkResponse = require('../common/utils/OkResponse');

const NATURAL_PERSON = 'Natural person';

exports.getNaturalPersons = asyncHandler(async (req, res, next) => {
    const naturalPersons = await NaturalPerson.find();

    res.status(StatusCode.SUCCESS).json(new OkResponse(naturalPersons));
});

exports.createNaturalPerson = asyncHandler(async (req, res, next) => {
    const passportNumber = req.body.passportNumber;

    const naturalPersonWithSamePassportNumberExists =
        await NaturalPerson.findOne({ passportNumber: passportNumber}) != null;

    if(naturalPersonWithSamePassportNumberExists){
        const response = new ErrorResponse(ErrorMessage.PASSPORT_NUMBER_EXISTS);
        return res.status(StatusCode.BAD_REQUEST).json(response);
    }

    const naturalPerson = await NaturalPerson.create(req.body);

    res.status(StatusCode.CREATE).json(new OkResponse(naturalPerson));
});

exports.getNaturalPersonById = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const naturalPerson = await NaturalPerson.findById(id);

    if(!naturalPerson){
        //TODO same code on different places. extract notFoundResult method
        const response = new ErrorResponse(ErrorMessage.idNotFound(NATURAL_PERSON, id));
        return res.status(StatusCode.NOT_FOUND).json(response);
    }
    
    res.status(200).json(new OkResponse(naturalPerson));
});

exports.updateNaturalPerson = asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    let naturalPerson = await NaturalPerson.findById(id);

    if(!naturalPerson){
        const response = new ErrorResponse(ErrorMessage.idNotFound(NATURAL_PERSON, id));
        return res.status(StatusCode.NOT_FOUND).json(response);
    }

    const passportNumberHasChanged = req.body.passportNumber && req.body.passportNumber != naturalPerson.passportNumber;

    if(passportNumberHasChanged){
        const response = new ErrorResponse(ErrorMessage.CHANGED_PASSPORT_NUMBER);
        return res.status(StatusCode.BAD_REQUEST).json(response);
    }

    naturalPerson = await NaturalPerson.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json(new OkResponse(naturalPerson));
});

exports.deleteNaturalPerson = asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    const personRelationIds = await Relations.find({
        $or:[
            { from: id },
            { to : id}
        ]}, '_id');

    await Relations.deleteMany({ _id : {$in : personRelationIds}});

    const naturalPerson = await NaturalPerson.findByIdAndDelete(id);

    if(!naturalPerson){
        const response = new ErrorResponse(ErrorMessage.idNotFound(NATURAL_PERSON, id));
        return res.status(StatusCode.NOT_FOUND).json(response);
    }

    res.status(200).json(new OkResponse(naturalPerson));
});

