/* class ApiError extends Error{
    constructor(statusCode, message){
        //super la constructor cua Error
        super(message)
        this.statusCode = statusCode
        this.message= message
    }
} */

class ApiError{
    constructor(statusCode, message){
        this.statusCode = statusCode
        this.message= message
    }
}

module.exports = ApiError