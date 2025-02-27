const express = require("express");
const { Todo } = require("../config/config");

const router = express.Router();

// GET all todos
router.get("/todos", async (req, res) => {
  try {
    const snapshot = await Todo.get();
    const todos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

// POST: Add new todo
router.post("/todos", async (req, res) => {
  try {
    const { text, dueDate } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }
    const newTodo = { text, completed: false, dueDate: dueDate || null };
    const docRef = await Todo.add(newTodo);
    res.status(201).json({ id: docRef.id, ...newTodo });
  } catch (error) {
    console.error("Error adding todo:", error);
    res.status(500).json({ error: "Failed to add todo" });
  }
});

// PUT: Update a todo by ID
router.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const todoRef = await Todo.doc(id).get();

    if (!todoRef.exists) return res.status(404).json({ error: "To-Do item not found" });

    await Todo.doc(id).update(updatedData);
    res.json({ message: "To-Do item updated successfully" });
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ error: "Failed to update todo" });
  }
});

// DELETE: Remove a todo by ID
router.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todoRef = await Todo.doc(id).get();

    if (!todoRef.exists) return res.status(404).json({ error: "To-Do item not found" });

    await Todo.doc(id).delete();
    res.json({ message: `Todo id- ${id} deleted successfully` });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

module.exports = router;
