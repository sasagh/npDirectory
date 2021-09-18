const Relation = require('../models/Relation');
const NaturalPerson = require('../models/NaturalPerson');
const asyncHandler = require('../middleware/asyncHandler');
const StatusCode = require('../common/enum/StatusCode');
const ErrorMessage = require('../common/messages/ErrorMessage');
const ErrorResponse = require('../common/utils/ErrorResponse');
const OkResponse = require('../common/utils/OkResponse');

const NATURAL_PERSON = 'Natural person';
const RELATION = 'Relation';

exports.getRelations = asyncHandler(async (req, res, next) => {
    const relations = await Relation.find();

    res.status(StatusCode.SUCCESS).json(new OkResponse(relations));
});

exports.createRelation = asyncHandler(async (req, res, next) => {
    const fromId = req.body.from;
    const toId = req.body.to;

    const from = await NaturalPerson.findById(fromId);
    if(!from){
        const response = new ErrorResponse(ErrorMessage.idNotFound(NATURAL_PERSON, fromId));
        return res.status(StatusCode.NOT_FOUND).json(response);
    }

    const to = await NaturalPerson.findById(toId);
    if(!to){
        const response = new ErrorResponse(ErrorMessage.idNotFound(NATURAL_PERSON, toId));
        return res.status(StatusCode.NOT_FOUND).json(response);
    }
    
    const filterToCheckIfRelationBetweenGivenIdsExist = {
        $or : [
            {
                $and : [
                    { from : fromId },
                    { to : toId }
                ]
            },
            {
                $and : [
                    { from : toId },
                    { to : fromId }
                ]
            },
        ]
    };

    const relationBetweenGivenIdsExists = await Relation.findOne(filterToCheckIfRelationBetweenGivenIdsExist) != null;
    if(relationBetweenGivenIdsExists){
        const response = new ErrorResponse(ErrorMessage.RELATION_EXISTS);
        return res.status(StatusCode.BAD_REQUEST).json(response);
    }

    const relation = await Relation.create(req.body);

    res.status(StatusCode.CREATE).json(new OkResponse(relation));
});

exports.getRelationById = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const relation = await Relation.findById(id);

    if(!relation){
        const response = new ErrorResponse(ErrorMessage.idNotFound(RELATION, id));
        return res.status(StatusCode.NOT_FOUND).json(response);
    }
    
    res.status(200).json(new OkResponse(relation));
});

exports.updateRelation = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    let relation = await Relation.findById(id);

    const from = req.body.from;
    const to = req.body.to;
    const fromIsChanged = from != relation.from;
    const toIsChanged = to != relation.to;
    const requestContainsFromField = from != undefined;
    const requestContainsToField = to != undefined;

    const fromOrToIsModified = requestContainsFromField && fromIsChanged || requestContainsToField && toIsChanged;
    if(fromOrToIsModified){
        const response = new ErrorResponse(ErrorMessage.CHANGED_IDS_IN_RELATION);
        return res.status(StatusCode.BAD_REQUEST).json(response); 
    }

    relation = await Relation.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    });

    return res.status(200).json(new OkResponse(relation));
});

exports.deleteRelation = asyncHandler(async (req, res, next) => {
    res.status(200).json({'success' : true, 'method' : 'delete:id'});
});

