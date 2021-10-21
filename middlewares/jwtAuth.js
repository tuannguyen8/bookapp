//exports.jwtAuth = () =>(req, res, next) =>{....};
const jwt = require("jsonwebtoken");
//const { JWT_SECRET } = require("../config");
const ApiError = require("../utils/ApiError");


exports.jwtAuth = (req, res, next) =>{
    const headerToken = req.headers.authorization;
    //console.log(headerToken);
    if(!headerToken){
        throw new ApiError(401, "Unauthorized");
    }
    const token = headerToken.split(" ")[1];

    if(!token){
        throw new ApiError(401, "Unauthorized");
    }
    try{
        //const user = jwt.verify(token, JWT_SECRET);
		const user = jwt.verify(token, process.env.JWT_SECRET);
		//Nghĩa là lấy đc cái user đang nhập 
		//req là object, mình gán cho nó property user
		//phải gán nó vô req, để khi cần có thể lấy ra
		req.user = user;
        next();
	}catch(error){
        //console.log(JSON.stringify(error, null, 2));
        if(error.name === "TokenExpiredError"){
			throw new ApiError(401, "Token is expired")
		}
        throw new ApiError(401, "Unauthorized")
	}
};
/* exports.jwtAuth = (req, res, next) =>{
    const{token} = req.body;
    if(!token){
        throw new ApiError(401, "Unauthorized");
    }
    try{
		const user = jwt.verify(token, JWT_SECRET);
		req.user = user;
        next();
	}catch(error){
        throw new ApiError(401, "Unauthorized")
	}
}; */


/* const jwt = require("jsonwebtoken");
exports.jwtAuth = (req, res, next) => {
	//const headerToken = req.header.Authorization
	const headerToken = req.headers["Authorization"];
	//user này là payload trong token
	if(!headerToken){
		throw new ApiError(401, "Unauthorized");
	}
	//dùng split để tách token ra khỏi cái định danh bearer, token sẽ là phần tử thứ 2
	const token = headerToken.split(" ")[1];
	if(!headerToken){
		throw new ApiError(401, "Unauthorized");
	}
	try{
		const user = jwt.verify(token, JWT_SECRET);
		//Nghĩa là lấy đc cái user đang nhập 
		//req là object, mình gán cho nó property user
		//phải gán nó vô req, để khi cần có thể lấy ra
		req.user = user
	}catch(error){
		if(error.name === "TokenExpiredError"){
			throw new ApiError(401, "Token is expired")
		}
		throw new ApiError(401, "Unauthorized");
	}
} */