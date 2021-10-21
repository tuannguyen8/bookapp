const express = require("express");
const authController = require("../controller/authController");
const { jwtAuth } = require("../middlewares/jwtAuth");
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);
router.post("/updatePassword", authController.updatePassword);
router.post("/resetPassword", jwtAuth, authController.resetPassword);
router.post("/randomPassword", authController.randomPassword);

module.exports= router;
