import React, { useState, useEffect } from "react";
import { Container, Typography, Paper, List } from "@mui/material";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";

const TodoList = () => {
  // State to store the list of todos
  const [todos, setTodos] = useState([]);

  // Fetch todos from the server when the component mounts
  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:4000/todos");
      if (!response.ok) throw new Error("Failed to fetch todos");

      const data = await response.json();
      // Update state with the fetched todos
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    // Call fetchTodos when the component mounts
    fetchTodos();
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  // Function to add a new todo
  const addText = async (text, dueDate) => {
    try {
      const response = await fetch("http://localhost:4000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Send the new todo data to the backend
        body: JSON.stringify({ text, dueDate }),
      });

      if (!response.ok) throw new Error("Failed to add todo");
      
      // Get the added todo
      const addedTodo = await response.json();
      // Add the new todo to the state
      setTodos((prevTodos) => [...prevTodos, addedTodo]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Function to edit an existing todo
  const editTodo = async (id, newText, completed) => {
    try {
        const response = await fetch(`http://localhost:4000/todos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            // Send updated todo data
            body: JSON.stringify({ text: newText, completed }),
        });

        if (!response.ok) throw new Error("Failed to edit todo");
      // Re-fetch updated data
        fetchTodos();
    } catch (error) {
        console.error("Error editing todo:", error);
    }
};


  // Function to delete a todo
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete todo");

      // Remove the deleted todo from the state
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "20px" }}>
      <Paper elevation={3} style={{ padding: "20px", borderRadius: "10px" }}>
        
        {/* Title of the To-Do App */}
        <Typography variant="h4" align="center" gutterBottom>
          To-Do App
        </Typography>

        {/* AddTodo component for adding new todos */}
        <AddTodo addText={addText} />
        <List>

          {/* Display a message if no todos exist */}
          {todos.length === 0 ? (
            <Typography variant="body1" align="center" color="textSecondary">
              No tasks to show
            </Typography>
          ) : (

            // Map over the todos and render each TodoItem
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}

                // Toggle completion state
                toggleComplete={() => editTodo(todo.id, todo.text, !todo.completed)}
                editTodo={editTodo}
                deleteTodo={deleteTodo}
              />
            ))
          )}
        </List>
      </Paper>
    </Container>
  );
};

export default TodoList;
