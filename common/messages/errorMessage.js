const ErrorMessage = {
    idNotFound: (resourceName, id) => `${resourceName} with id ${id} not found`,
    PASSPORT_NUMBER_EXISTS: 'Natural person with this passport number already exists',
};

Object.freeze(ErrorMessage);

module.exports = ErrorMessage;