const express = require("express");
const authController = require("../controller/authController");
const { basicAuth } = require("../middlewares/basicAuth");
const { jwtAuth } = require("../middlewares/jwtAuth");
const { limiter } = require("../middlewares/rateLimit");
const router = express.Router();

router.post("/register", basicAuth, authController.register);
router.post("/login", limiter(10,1), basicAuth, authController.login);
router.post("/forgotPassword", authController.forgotPassword);
router.post("/updatePassword", authController.updatePassword);
router.post("/resetPassword", jwtAuth, authController.resetPassword);
router.post("/randomPassword", authController.randomPassword);

module.exports= router;
