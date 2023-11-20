import Todo from "../models/todo.models.js";

// GET all todos
const getAllTodosHandler = async (req, res) => {
  const todos = await Todo.find({}).sort({ createdAt: -1 });
  return res.status(200).json({ todos });
};

// GET todo by id
const getTodoByIdHandler = async (req, res) => {
  try {
    const { todoId } = req.params;
    const todo = await Todo.findById(todoId);
    if (!todo) {
      throw new Error("Todo does not exist!");
    }
    return res.status(200).json(todo);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

// CREATE a todo
const createTodoHandler = async (req, res) => {
  const { title } = req.body;
  try {
    const todo = await Todo.create({
      title,
    });
    return res.status(201).json(todo);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// DELETE todo
const deleteTodoHandler = async (req, res) => {
  const { todoId } = req.params;
  try {
    const todo = await Todo.findByIdAndDelete(todoId);
    if (!todo) {
      throw new Error("Todo does not exist!");
    }
    return res.status(200).json({ todo });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// UPDATE todo
const updateTodoHandler = async (req, res) => {
  const { todoId } = req.params;
  const { title } = req.body;
  try {
    const todo = await Todo.findByIdAndUpdate(
      todoId,
      {
        $set: {
          title,
        },
      },
      { new: true }
    );
    if (!todo) {
      throw new Error("Todo does not exist!");
    }
    return res.status(200).json({ todo });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export {
  getAllTodosHandler,
  getTodoByIdHandler,
  createTodoHandler,
  deleteTodoHandler,
  updateTodoHandler,
};
