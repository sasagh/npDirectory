const ErrorMessage = {
    idNotFound: (resourceName, id) => `${resourceName} with id ${id} not found`,
    PASSPORT_NUMBER_EXISTS: 'Natural person with this passport number already exists',
    CHANGED_PASSPORT_NUMBER: 'Changing passport number is not allowed',
    RELATION_EXISTS: 'Relation between given id\'s already exists',
    CHANGED_IDS_IN_RELATION: 'Changing \'from\' and \'to\' is not allowed'
};

Object.freeze(ErrorMessage);

module.exports = ErrorMessage;