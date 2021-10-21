const catchAsync = require("../middlewares/async");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const EmailService = require("../utils/EmailService");
//const { JWT_SECRET } = require("../config");
const crypto = require('crypto');
const Token = require("../models/Token");
const {nanoid} = require("nanoid");
//const bcrypt = require("bcryptjs");

const generator = require('generate-password');

exports.register = catchAsync(async (req, res)=>{
    const {name, email, password, age, role} = req.body;
    const user = await User.create({
        name,
        email,
        password,
        age,
        role,
    });
    res.status(201).json({
        success: true,
        data: user,
    });
    await EmailService.sendMail(email, "Congratuation!!", "You have an account!!")
});

exports.login = catchAsync(async (req, res)=>{
    const {email, password} = req.body;
    //kiem tra email tren db
    const existedUser = await User.findOne({email});
    //console.log(existedUser.password);
    if(!existedUser){
        throw new ApiError(400, "Email or Password is incorrect!");
    }
    //password người dùng nhập vào sẽ đc so sánh với hashed password bên trong databse để trả về isMatch true or false
    const isMatch = bcrypt.compareSync(password, existedUser.password);
    if(!isMatch){
        throw new ApiError(400, "Email or Password is incorrect!");
    }
    //console.log("password trung: ", isMatch)

    const token = jwt.sign(
        {   //payload: là 1 cái object chứa những thông tin định danh của tài khoản
            //payload thì public, ai cũng có thể đọc đc thông tin từ cái payload này
            email: existedUser.email,
            name: existedUser.name,
            role: existedUser.role,
            //video 10/9/2021: phut 7
            //id: existedUser._id,
        },  //secretKey: là 1 cái key dùng để mã hoá cái token này. trường hợp này mình xài 123456
        //"123456",
        //JWT_SECRET,
        process.env.JWT_SECRET,
        {
            //option: ở đây option là hết hạn trong vòng 1h
            expiresIn: '1D',
        }
    );
    res.json({
        success: true,
        token,
    });
    //say này sẽ decode token, để lấy email --> sau đó ktra email có trong database hay ko
});
//////////////////////////////////////////////////////////////////////
exports.updatePassword = catchAsync(async (req, res)=>{
    const {userId, token, password} = req.body;
    const userToken = await Token.findOne({userId});

    if(!userToken){
        throw new ApiError(400, "Invalid token")
    }

    //compare
    const isMatchToken = await bcrypt.compareSync(token, userToken.token);

    if(!token || !isMatchToken){
        throw new ApiError(400, "Invalid token")
    }

    const user = await User.findOne({_id: userId});

    user.password = password;
    //user.save() nó sẽ chạy cái UserSchema.pre("save", function(next)){...}
    //ở trong User.js
    const result = await user.save(); //Nếu save ko đc--> error middaleware sẽ chạy
    
    //Video 10-15-2021: phut 1:10:10
    //chúng ta có thể dùng Promise.all để gom 2 cái promise lại làm 1, để 2 cái
    //promise có thể thực hiện cùng lúc nhằm tiếc kiệm thời gian
    //Nhưng trong trường hợp này chúng ta ko nên làm như vậy, bởi vì
    //user.save() có thể bị lỗi không thực hiện được.(ví dụ như người dùng nhập
    //newpassword mà chỉ có 1 ký tự, thì user.save() sẽ ko thực hiện đc, vì valid 
    //password là phải 6 tới 30 ký tự)
    //await Promise.all([user.save(), userToken.remove()])

    //await userToken.delete();//delete chỉ có callback, remove trả về promise
    if(result){
        await userToken.remove();
    }   
    res.json({
        success: true,
        message: "Your password updated"
    })


});
///////////////////////////////////////////////////////////////////////////
exports.forgotPassword = catchAsync(async (req, res)=>{
    const {email} = req.body;    
    const user = await User.findOne({email}); 
    if(!user){
        throw new ApiError(404, "User is not existed!");
    }
    const userId = user._id;
    //kiểm tra trong collection tokens
    const token = await Token.findOne({userId: user._id});
    if(token){
        return res.status(200).json({
            success: true,
            message: "Please check your email"
        })
    }
    //tạo mới token
    //random token, bản chất của token là cái string, secure string cho bảo mật
    const newToken = nanoid(32);

    //hash Token
    const salt = bcrypt.genSaltSync();
    const hashToken = bcrypt.hashSync(newToken, salt);

    //save token
    await Token.create({userId, token: hashToken});

    //send to email
    EmailService.sendMail(email, "Forgot Password", `http://mywebsite/forgot?token=${newToken}&id=${userId}`)
    res.json({
        success: true,
        message: "Please check your email"
    })



});

exports.resetPassword = catchAsync(async (req, res)=>{
    const {email} = req.user;
    const {oldPassword, newPassword} = req.body;
    const user = await User.findOne({email});
    if(!user){
        throw new ApiError(404, "Not found")
    }

    //ktra oldPassword
    const isValidOldPassword = bcrypt.compareSync(oldPassword, user.password);
    if(!isValidOldPassword){
        throw new ApiError(400, "Invalid password")
    }
    user.password = newPassword;
    await user.save();
    res.json({
        success: true,
        message: "Your Password updated"
    })
});

//npm install generate-password --save
//https://www.npmjs.com/package/generate-password
exports.randomPassword = catchAsync(async (req, res)=>{
    const{length, numbers, symbols, lowercase, uppercase, strict} = req.body;
    const password = generator.generate({
        length,
        numbers,
        symbols,
        lowercase,
        uppercase,
        strict,
    });
    console.log(password);
    res.json({
        success: true,
        randomPassword: password
    })
}); 

