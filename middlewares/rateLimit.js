const rateLimit = require("express-rate-limit");

exports.limiter = (requests, minutes)=> rateLimit({
  windowMs: minutes * 60 * 1000, // minutes
  max: requests // limit each IP to num of requests per windowMs
  //message: "you have done too much requests",
  //skipSuccessfulRequests: true
});