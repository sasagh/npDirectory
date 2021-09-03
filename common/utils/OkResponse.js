class OkResponse {
    constructor(data){
        this.success = true,
        this.count = data.length,
        this.data = data
    }
}

module.exports = OkResponse;