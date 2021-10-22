require("dotenv").config(); //biến môi trường
//nhung package
const express = require("express");
//nhung file
//const {PORT} = require("./config");
const connectDB = require("./config/db");
const catchError = require("./middlewares/error");

const todoRoutes = require("./routes/todoRoutes")
const bookRoutes = require("./routes/bookRoutes")
const authRoutes = require("./routes/authRoutes")
const categoryRoutes = require("./routes/categoryRoutes");
const stockRoutes = require("./routes/stockRoutes");
const cors = require('cors'); //giải quyết khác port giữa backend và frontend, video 10-20-2021, phút 1:31:26

const EmailService = require("./utils/EmailService");

//mongodb+srv://tuannguyen:826049THang@cluster0.ohjvx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

//config email, video 10/14/2021, phut 1:12:22
EmailService.init();


const app = express();

app.use(express.json()); 

app.use(cors()); //video 10-20-2021, phut 1:31:34

//biến môi trường: enviroment
//console.log(process.env);

//connect DB
connectDB()

//routes
app.use("/api/v1/todo", todoRoutes);
app.use("/api/v1/book", bookRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
/* app.use("/api/v1/stock", stockRoutes); */
app.use("/api/v1/dictionary", stockRoutes);

//catch error middleware
app.use(catchError);

/* const mailer = new EmailService()
mailer.sendMail(process.env.EMAIL, "nguyenvutuan1@gmail.com", "Test mail", "this is a test")
 */
//EmailService.sendMail(process.env.EMAIL, "nguyenvutuan1@gmail.com", "Test mail", "this is a test")
//EmailService.sendMail("thienlongbatbo789456@gmail.com", "Test mail", "this is a test")


/* app.listen(PORT, () => {
  	console.log(`Server is running on port ${PORT}`);
});  */ 
const PORT = process.env.PORT;
app.listen(PORT, () => {
  	console.log(`Server is running on port ${PORT}`);
}); 

//https://dictionary-spelling-heroku.herokuapp.com/