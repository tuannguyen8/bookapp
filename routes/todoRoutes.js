const express = require("express");
const todoController = require("../controller/todoController");
const router = express.Router();

router.get("/", todoController.getTodos);
//video 9-28-2021, phút 1:09:38
router.get("/:id", todoController.getTodoById);
router.post("/", todoController.createTodo);
router.delete("/:id",todoController.deleteTodo);
router.patch("/:id", todoController.updateTodo);

module.exports= router;