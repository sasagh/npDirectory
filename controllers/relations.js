const Relation = require('../models/Relation');
const asyncHandler = require('../middleware/asyncHandler');
const StatusCode = require('../common/constants/StatusCode');
const ErrorMessage = require('../common/messages/ErrorMessage');
const ErrorResponse = require('../common/utils/ErrorResponse');
const OkResponse = require('../common/utils/OkResponse');

exports.getRelations = asyncHandler(async (req, res, next) => {
    const relations = await Relation.find();

    res.status(StatusCode.SUCCESS).json(new OkResponse(relations));
});

exports.createRelation = asyncHandler(async (req, res, next) => {
    const relation = await Relation.create(req.body);

    res.status(StatusCode.CREATE).json(new OkResponse(relation));
});

exports.getRelationById = asyncHandler(async (req, res, next) => {
    res.status(200).json({'success' : true, 'method' : 'get:id'});
});

exports.updateRelation = asyncHandler(async (req, res, next) => {
    res.status(200).json({'success' : true, 'method' : 'put:id'});
});

exports.deleteRelation = asyncHandler(async (req, res, next) => {
    res.status(200).json({'success' : true, 'method' : 'delete:id'});
});

