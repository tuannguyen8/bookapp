const ApiError = require("../utils/ApiError");

exports.authorize = (...roles) => (req, res, next) =>{
    //console.log(roles);
    const role = req.user.role;

    if(!role || !roles.includes(role)){
        throw new ApiError(403, "No permission");
    }
    next();
    

}

//step 1: (User.js file) thêm cái role cho cái userschema line 23-27
//step 2: (authController.js file) trong phần register, thêm role cho req.body (line 9) và User.create (line 15)
//step 3: (bookRoutes.js file) thêm middleware authorize vào những nơi cần
//step 4: (authorize.js file) viết middleware cho authorize
    //a. (line 3)dùng rest operator vì mình ko thể biết đc sẽ có bao nhiêu cái role. rest operator sẽ tạo cái mảng roles
    //b. (line 5)tạo biến role có giá trị bằng req.user.role
    //c. (line7-9) nếu role (tức role của user) ko tồn tại hoặc role của user ko phù hợp với roles của middleware sẽ báo lỗi 403
    //d. (line 10) next() khi ko có lỗi xảy ra, cho chạy tiếp chương trình
//step 5: (eror.js file) bắt lỗi khi người dùng đăng ký 1 role ko tồn tại, sẽ báo lỗi invalid enum value (line 17-19)
//step 6: tạo folder constants-> file index.js: tạo 1 object chứa các role để sử dụng cho tiện