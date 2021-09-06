const Response = require('./Response');

class OkResponse extends Response{
    constructor(data){
        super(true, data);
    }
}

module.exports = OkResponse;