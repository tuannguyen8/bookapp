const catchAsync = require("../middlewares/async");
const Book = require("../models/Book");
const ApiError = require("../utils/ApiError");

exports.getBooks = catchAsync(async (req, res)=>{
    //console.log("current User: ", req.user);
    //const books = await Book.find({});
    //const books = await Book.find({}).populate("category","name description");
    //const books = await Book.find({}).populate("author", "name email -_id");
    const books = await Book.find({})
    .populate("author_detail", "name email -_id")
    .populate("category", "name description -_id");

    res.json({
        sucess: true,
        data: books,
    })
});
exports.getBookDetail = catchAsync(async (req, res)=>{
    const{id} = req.params;
    const book = await Book.findById(id);
    if(!book){
        throw new ApiError(404, "Not Found")
    }
    res.json({
        sucess: true,
        data: book,
    })

});
exports.updateBook = catchAsync(async (req, res)=>{
    const{id} = req.params;
    const {title, description, price} = req.body;
    const author = req.user.email;
    const book = await Book.findOneAndUpdate(
        {_id: id, author}, 
        {title, description, price},
        //new: true có chức năng là nó sẽ lấy cái document book sau khi update để trả về bên trong res.json
        {new: true}    
    );
    /* const book = await Book.findByIdAndUpdate(
        id, 
        {title, description, price},
        //new: true có chức năng là nó sẽ lấy cái document book sau khi update để trả về bên trong res.json
        {new: true}    
    ); */
    res.json({
        success: true,
        data: book,
    })

});

//PHut: 1:06: 57, video 9-30-2021, update a book by title
exports.updateBookByTitle = catchAsync(async (req, res)=>{
    const {titleName, title, description, price} = req.body;
    const book = await Book.findOneAndUpdate(
        {title: titleName},
        {title, description, price},
        {new:true}
    );
    res.json({
        success: true,
        data: book,
    });

});

//chỉ có user admin mới đc xoá
exports.deleteBook = catchAsync(async (req, res)=>{
    const {id} = req.params;
    const author = req.user.email;
    const deletedBook = await Book.deleteOne({_id: id, author});
    //console.log(deletedBook)
    //await Book.findByIdAndDelete(id);
    res.json({
        sucess: true,
    })
});

exports.createBook = catchAsync(async (req, res)=>{
    const {title, description, price, category} = req.body;
    //const authorID = req.user.id;
    const author = req.user.email;
    //const book = await Book.create({title, description, author:authorId, price});
    const book = await Book.create({title, description, author, price, category});
    res.status(201).json({
        sucess: true,
        data: book,
    });
    
});