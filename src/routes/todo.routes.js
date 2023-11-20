import { Router } from "express";
import {
  createTodoHandler,
  deleteTodoHandler,
  getAllTodosHandler,
  getTodoByIdHandler,
  updateTodoHandler,
} from "../controllers/todo.controllers.js";

const todoRouter = Router();

todoRouter
    .route("/")
    .post(createTodoHandler)
    .get(getAllTodosHandler);
todoRouter
  .route("/:todoId")
  .get(getTodoByIdHandler)
  .patch(updateTodoHandler)
  .delete(deleteTodoHandler);

export default todoRouter;
