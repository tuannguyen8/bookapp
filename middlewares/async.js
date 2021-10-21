//catchAsync nhan tham so la fn, fn la 1 function, va no tra ve 1 function khac
//va function tra ve co 3 tham so: req, res, next
//phut 11: vide 9-28-2021
const catchAsync = fn => (req, res, next) =>{
    Promise.resolve(fn(req, res, next)).catch(err => next(err))
}


module.exports = catchAsync;