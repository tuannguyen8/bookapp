const catchAsync = require("../middlewares/async");
const Category = require("../models/Category");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.getCategories = catchAsync(async (req, res)=>{
    const categories = await Category.find({});
    res.json({
        sucess: true,
        data: categories,
    })
});
exports.createCategory = catchAsync(async (req, res)=>{
    const {name, description} = req.body;
    const category = await Category.create({
        name,
        description,
    });
    res.status(201).json({
        success: true,
        data: category,
    })
});