import { Router } from "express";
import {
  createTodoHandler,
  deleteTodoHandler,
  getAllTodosHandler,
  getTodoByIdHandler,
  updateTodoHandler,
} from "../controllers/todo.controllers.js";
import auth from "../middlewares/auth.middlewares.js";

const todoRouter = Router();

todoRouter.use(auth);

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
