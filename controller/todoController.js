const catchAsync = require("../middlewares/async");
const catchError = require("../middlewares/error");
const Todo = require("../models/todo");
const ApiError = require("../utils/ApiError");


exports.getTodos = catchAsync(async (req, res)=>{
    const todos = await Todo.find()
    if(!todos.length){
        throw new ApiError(400, "No Todos")
    }
    //Console.log(todos)
    res.json({
        success: true,
        data: todos
    });
});

exports.createTodo = catchAsync(async (req, res)=>{
    const{title, description} = req.body; 
    const todo = await Todo.create({
        title,
        description,
    });
    /* .catch((err) => {
        const errors = err.errors
        const keys = Object.keys(errors)
        const errorObj = {}
        keys.map(key =>{
            errorObj[key] = errors[key].message
        }) */

        //throw new ApiError(400, errorObj)
        /* res.status(400).json({
            success: false,
            errors: errorObj
            //phut 24 video 9-23-2021 
        }) 
    })*/
    //*****important: phút 1:07:33 video 9-28-2021
    //Nếu ở đây, ngay dòng này phát sinh lỗi, thì nó sẽ ko chạy dòng bên dưới, tức dòng res.status(201).json(todo);
    //Lý do lỗi là do moogoose, trong trường hợp này là do người nhập ko điền thông tin phù hợp 
    //với cái schema todo trong file todo.js. Lúc này catchAsync trong file async.js sẽ bắt đc lỗi này.
    //Cái err này sẽ đc đẩy qua cái next(err), chính là cái middleware tiếp theo kèm theo cái message là 
    //err. middleware tiếp theo tức là cái catchError middleware: app.use(catchError) trong file index.js
    
    //http status code
    res.status(201).json(todo);
});


exports.deleteTodo = catchAsync (async (req, res)=>{
    const {id} = req.params
    await Todo.findByIdAndDelete(id)
    res.json({
        success: true,
    });
});


exports.updateTodo = catchAsync(async (req, res)=>{
    const {id} = req.params;
    const {title, description} = req.body;
    await Todo.findByIdAndUpdate(id, {title, description}) 
    res.json({
        success: true,
    });
});

//video 9-28-2021, phut 1:09:30

exports.getTodoById = catchAsync(async (req, res)=>{
    const {id} = req.params;
    const todo = await Todo.findById(id);
    if(!todo){
        throw new ApiError (404, "Not found")
    }
    res.json({
        success: true,
        data: todo
    });
});