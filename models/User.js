const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcryptjs");
const { ROLES } = require("../constants");

const UserSchema = new Schema({
    name: {
        type: String,
        require: [true, "name is required"],
        minlength: [3, "Must be at least 3 chatacters"],
    },
    email:{
        type: String,
        require: [true, "email is required"],
        unique: true,
    },
    password: {
        type: String, 
        require: [true, "password is required"],
        minlength: [6, "must be at least 6 characters"],
        maxlength: [30, "must be less than 30 characters"]
    },
    role:{
        type: String,
        enum: ROLES,
        default: ROLES.GUEST,
    },
    age:{
        type: Number,
    },
    books:[String],
}, 
{
    collection: "nb-users",
    timestamps: true,
});

//save middleware
//Phút 39: ngay chỗ này ko thể dùng arrow function, nó sẽ ra undefine,
//Bởi vì từ khoá this trong arrow function nó sẽ ra undefine
UserSchema.pre("save", function(next){
    if(this.isModified("password")){
        //truoc khi luu can phai hash password
        //mặc định rounds = 10, round đại diện cho độ phức tạp
        //const salt = await bcrypt.genSalt();
        const salt = bcrypt.genSaltSync(10); //.genSaltSync(round) - 2^10
        //console.log("salt:", salt);
        //salt là gì? Salt sẽ được gộp chung với password người dùng điền vào, để tạo ra hashedPassword
        const hashedPassword = bcrypt.hashSync(this.password, salt);
        //console.log(hashedPassword);

        //this ở đây là cái UserSchema, password là cái field password trong UserSchema
        this.password = hashedPassword;
    }
    
    next();
})

module.exports = mongoose.model("User", UserSchema); 