const NaturalPerson = require('../models/NaturalPerson')

exports.getNaturalPersons = (req, res, next) => {
    res.status(200).json({"success" : true, 'method' : 'get'});
}

exports.createNaturalPerson = async (req, res, next) => {
    const naturalPerson = await NaturalPerson.create(req.body);

    res.status(201).json({
        data: naturalPerson
    });
}

exports.getNaturalPersonById = (req, res, next) => {
    res.status(200).json({'success' : true, 'method' : 'get:id'});
}

exports.updateNaturalPerson = (req, res, next) => {
    res.status(200).json({'success' : true, 'method' : 'put:id'});
}

exports.deleteNaturalPerson = (req, res, next) => {
    res.status(200).json({'success' : true, 'method' : 'delete:id'});
}

