exports.getRelations = (req, res, next) => {
    res.status(200).json({"success" : true, 'method' : 'get'});
}

exports.createRelation = (req, res, next) => {
    res.status(200).json({'success' : true, 'method' : 'post'});
}

exports.getRelationById = (req, res, next) => {
    res.status(200).json({'success' : true, 'method' : 'get:id'});
}

exports.updateRelation = (req, res, next) => {
    res.status(200).json({'success' : true, 'method' : 'put:id'});
}

exports.deleteRelation = (req, res, next) => {
    res.status(200).json({'success' : true, 'method' : 'delete:id'});
}

