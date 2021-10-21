//phut 29: video 9\28\2021
const catchError = (err, req, res, next)=>{ 
    //console.log(JSON.stringify(err, null, 2))
    //xu ly cac error
    

    //phut 55: video 9-28-2021
    //loi lien quan den validation mongoose 
    //lỗi liên quan đến ValidationError trong mongoose sẽ đc
    // add add vào object finalError, và cái trả là cái finalError
    if(err.name === 'ValidationError'){
        const errors = err.errors;
        const keys = Object.keys(errors);
        const errorObj = {};
        keys.map(key =>{
            errorObj[key] = errors[key].message;
            if(errors[key].kind === "enum"){
                errorObj[key] = "invalid enum value";
            }
        });
        //lỗi liên quan tới validationError thì nên để là lỗi 400
        err.statusCode = 400;
        err.message= errorObj;
    }
    //bad ObjectId
    if(err.kind === 'ObjectId'){
        err.statusCode = 400;
        err.message = "Invalid Id";
    }

    //dupplicate field, phut 49, video 10-2-2021
    if(err.code === 11000){
        err.statusCode = 400;
        const field = Object.keys(err.keyValue)[0] //email
        //Nếu có nhiều field trùng, sẽ dùng cách này. 
        //toString() sẽ nói cáng phần từ của mảng
        //const field = Object.keys(err.keyValue)[0].toString(); //email
        err.message = `${field} is dupplicated`;
    }


    res.status(err.statusCode || 500).json({
        success: false,
        statusCode: err.statusCode || 500,
        message: err.message || "Internal Error!",
    });
};

module.exports = catchError;