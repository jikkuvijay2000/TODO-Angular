const express = require("express");
const { verifyToken } = require("../Controllers/userController");
const {
  addTodo,
  deleteTodo,
  getalltodo,
} = require("../Controllers/todoController");

const router = express.Router();

router.post("/v1/addtodo/:userID", addTodo, verifyToken);
router.delete("/v1/deletetodo/:userID", deleteTodo, verifyToken);
router.get("/v1/gettodo/:userID", getalltodo, verifyToken);

module.exports = { todoRouter: router };
