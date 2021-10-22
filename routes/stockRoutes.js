//video 10/20/2021
const express = require("express");
const catchAsync = require("../middlewares/async");
const axios = require("axios");
const router = express.Router();
const request = require("request") //dùng lấy source code, video 10-20-2021 phút 1:14:09
const cheerio = require('cheerio'); //

/* router.get("/", catchAsync(async(req,res)=>{
    //code
    const {symbols} = req.query;
    const ACCESS_KEY = "90be8305c359df2aac5d49a4b10218b0";
    const url =`http://api.marketstack.com/v1/eod?access_key=${ACCESS_KEY}&symbols=AAPL`
    
    const result = await axios.get(url);
    console.log(result.data); 
    //PHút 43:56 nhớ phải .data, vì dữ liệu axios trả về sẽ nằm bên trong
    //cái property tên là data, nó là giá trị mặc định của thằng axios trả về
    
    res.json({
        success: true,
        data: result.data
    })
})); */

router.get("/", catchAsync(async(req,res)=>{
    //code
    const {word} = req.query;
    
    //sử dụng request để lấy source code
    request(`https://www.dictionary.com/browse/${word}`, (err,responsive, body)=>{
        const $ = cheerio.load(body);
        const data = $(".pron-spell-content").text()
        res.json({
            success: true,
            data
        })
    })
    
}));


module.exports= router;
