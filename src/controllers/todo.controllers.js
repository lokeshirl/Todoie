import Todo from "../models/todo.models.js";

// GET all todos
const getAllTodosHandler = async (req, res) => {
  const user_id = req.user._id;
  const todos = await Todo.find({ createdBy: user_id }).sort({ createdAt: -1 });
  return res.status(200).json({ todos });
};

// GET todo by id
const getTodoByIdHandler = async (req, res) => {
  const user_id = req.user._id;
  try {
    const { todoId } = req.params;
    const todo = await Todo.findOne({ _id: todoId, createdBy: user_id });
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
  const user = req.user;
  try {
    const todo = await Todo.create({
      createdBy: user._id,
      title,
    });
    return res.status(201).json(todo);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// DELETE todo
const deleteTodoHandler = async (req, res) => {
  const user_id = req.user._id;
  const { todoId } = req.params;
  try {
    const todo = await Todo.findOneAndDelete({
      _id: todoId,
      createdBy: user_id,
    });
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
  const user_id = req.user._id;
  const { todoId } = req.params;
  const { title, completed } = req.body;
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: todoId, createdBy: user_id },
      {
        $set: {
          title,
          completed
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
