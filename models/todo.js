
//const {Schema} = require("mongoose");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todoSchma = new Schema({
    title: {
        type: String,
        required: [true, "title is required!!"],
        minlength: [6, "Must be at least 6 characters"],
        maxlength: [30, "Must be less than 30 characters"]
    },
    description: {
        type: String,
        required: [true, "description is required!!"],
        minlength: [6, "Must be at least 6 characters"],
        maxlength: [30, "Must be less than 30 characters"]
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
});

//export model todoSchma => create a modelcollection Todo
const Todo = mongoose.model("Todo", todoSchma)

module.exports = Todo;