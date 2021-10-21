const mongoose = require("mongoose")

const Schema = mongoose.Schema

const BookSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "title is required"],
            minlength: [3, "Must be at least 3 chatacters"],
        },
        description:{
            type: String,
        },
        author: {
            //video 10-9-2021: phut 4:30
            //dùng ref để liên kết với collection khác
            //chỉ khi nào có ref thì mới sử dụng populate đc.
            //Mặc định của cái ref là tìm theo Id, có nghĩa là
            //ref sẽ đem cái ObjectId của cái author qua bên cái model user
            //để tìm cái có trùng cái objectId
            //ObjectId là cái id đc tạo tự động bởi moogoosedb cho mỗi cái document 
            //type: mongoose.Types.ObjectId,
            //ref: 'User',
            type: String,
            
            /* type: String, 
            required: [true, "Author is require"], */
        },
        price: {
            type: Number,
            required: [true, "price is required"],
        },
        category:{
            type: mongoose.Types.ObjectId,
            ref: "Category"
        }
    }, 
    {
        collection: "nb-books",
        timestamps: true,
        //=> chuyển cái author_detail thành cái json khi mình sử dụng ref.json
        //video 10-9-2021: phut 27:30 và phút 35:50
        toJSON: {
            virtuals: true
        } 
        
    }
);

//video 10-9-2021: phut 25
//ref mặc định sẽ kiếm ObjectId, nên nếu ko sử ref, chúng ta bắt buộc phải 
//tạo cái virtual
BookSchema.virtual("author_detail",{
    ref: "User", //kiếm trong model User
    localField: "author", //là cái field hiện tại đang cần trong cái book model
    foreignField: "email", //là cái field muốn tìm trong User model
})

//PHut 59, video 9-30-2021: Nếu ko có dòng này, khi mình thực hiện update nó sẽ ko thực
//hiện kiểm tra validate theo như schema ban đầu mình đã làm
mongoose.set("runValidators", true);

module.exports = mongoose.model("Book", BookSchema)