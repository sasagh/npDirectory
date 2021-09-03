const ErrorMessage = {
    idNotFound: (resourceName, id) => `${resourceName} with id ${id} not found`,
};

Object.freeze(ErrorMessage);

module.exports = ErrorMessage;