const express = require("express");
const bookController = require("../controller/bookController");
const { jwtAuth } = require("../middlewares/jwtAuth");
const { authorize } = require("../middlewares/authorize");
const { ROLES } = require("../constants");
const router = express.Router();

//router.get("/", jwtAuth, bookController.getBooks);
router.get("/", bookController.getBooks);

router.get("/:id", jwtAuth, bookController.getBookDetail);
//router.post("/", jwtAuth, authorize(ROLES.ADMIN), bookController.createBook);
router.post("/", jwtAuth, bookController.createBook);
//router.delete("/:id", jwtAuth, authorize(ROLES.ADMIN), bookController.deleteBook);
router.delete("/:id", jwtAuth, bookController.deleteBook);
//router.patch("/:id", jwtAuth, authorize(ROLES.ADMIN, ROLES.GUEST), bookController.updateBook);
router.patch("/:id", jwtAuth, bookController.updateBook);
router.patch("/", jwtAuth, authorize(ROLES.ADMIN, ROLES.GUEST), bookController.updateBookByTitle);
 
module.exports= router;