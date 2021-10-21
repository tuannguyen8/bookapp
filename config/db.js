const mongoose = require("mongoose")

const connectDB = () => {

    //using mongoose to connect the database
    //database is "mytodo" in mongodb
    mongoose
    //.connect("mongodb://localhost:27017/mybook")
    .connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connect to DB successfully!");
    })
    .catch((err) => console.log("Can not connect to Database"));

}

module.exports= connectDB;