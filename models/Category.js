const mongoose = require("mongoose")

const Schema = mongoose.Schema

const CategorySchema = new Schema(
    {
        name:{
            type: String,
            require: [true, "name is required"], 
            unique: true
        },
        description:{
            type: String,
        },
        
    }, 
    {
        collection: "nb-categories",
        timestamps: true,
    }
);

mongoose.set("runValidators", true);

module.exports = mongoose.model("Category", CategorySchema)