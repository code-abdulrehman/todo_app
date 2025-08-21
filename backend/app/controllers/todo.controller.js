import Todo from "../models/todo.model.js";

// Get all todos
export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new todo
export const createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    const todo = await Todo.create({ title });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update todo (mark completed or change title)
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    const todo = await Todo.findByPk(id);
    if (!todo) return res.status(404).json({ error: "Todo not found" });

    todo.title = title ?? todo.title;
    todo.completed = completed ?? todo.completed;
    await todo.save();

    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete todo
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    if (!todo) return res.status(404).json({ error: "Todo not found" });

    await todo.destroy();
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
