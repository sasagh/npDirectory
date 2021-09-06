const Response = require('./Response');

class ErrorResponse extends Response {
    constructor(errorMessages) {
      super(false, errorMessages);
  }
}
  
module.exports = ErrorResponse;  