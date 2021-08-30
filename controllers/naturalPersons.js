const NaturalPerson = require('../models/NaturalPerson')

exports.getNaturalPersons = async (req, res, next) => {
    const naturalPersons = await NaturalPerson.find();

    if(naturalPersons.length > 0){
        res.status(200).json({ success: true, size: naturalPersons.length, data: naturalPersons });
    } else {
        res.status(404).json({ success: false });
    }
}

exports.createNaturalPerson = async (req, res, next) => {
    const naturalPerson = await NaturalPerson.create(req.body);

    res.status(201).json({ data: naturalPerson });
}

exports.getNaturalPersonById = async (req, res, next) => {
    const naturalPerson = await NaturalPerson.findById(req.params.id);

    if(naturalPerson){
        res.status(200).json({ success: true, data: naturalPerson });
    } else {
        res.status(404).json({ success: false });
    }
}

exports.updateNaturalPerson = async (req, res, next) => {
    const naturalPerson = await NaturalPerson.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if(naturalPerson){
        res.status(200).json({ success: true, data: naturalPerson });
    } else {
        res.status(404).json({ success: false });
    }
}

exports.deleteNaturalPerson = async (req, res, next) => {
    const naturalPerson = await NaturalPerson.findByIdAndDelete(req.params.id);

    if(naturalPerson){
        res.status(200).json({ success: true, data: {} });
    } else {
        res.status(404).json({ success: false });
    }
}

