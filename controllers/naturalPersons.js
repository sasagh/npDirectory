exports.getNaturalPersons = (req, res, next) => {
    res.status(200).json({"success" : true, 'method' : 'get'});
}

exports.createNaturalPerson = (req, res, next) => {
    res.status(200).json({'success' : true, 'method' : 'post'});
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

