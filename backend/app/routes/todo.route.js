import express from "express";
import {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  getTodoById,
} from "../controllers/todo.controller.js";

const router = express.Router();

router.get("/", getAllTodos);
router.get("/:id", getTodoById);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
