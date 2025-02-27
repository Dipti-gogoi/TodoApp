import React, { useState } from "react";
import { Checkbox, ListItem, ListItemText, TextField, IconButton, Typography } from "@mui/material";
import { Edit, Delete, Save } from "@mui/icons-material";
import "../App.css";

// Component for rendering individual to-do items
const TodoItem = ({ todo, toggleComplete, editTodo, deleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

// Enables editing mode when the edit button is clicked
  const handleEdit = () => {
    setIsEditing(true);
  };

// Saves the updated task and disables editing mode
  const handleSave = () => {
    editTodo(todo.id, newText);
    setIsEditing(false);
  };

  return (
    <ListItem className={`todo-item ${todo.completed ? "completed" : ""}`}>
      {/* Checkbox for marking a task as completed or not */}
      <Checkbox checked={todo.completed} 
      // Calls toggleComplete to update the task completion state
      onChange={() => toggleComplete(todo.id)} color="primary" />

      {/* If editing, show a text field, otherwise display the task text */}
      {isEditing ? (
        <TextField
          value={newText}
          // Updates newText with user input
          onChange={(e) => setNewText(e.target.value)}
          size="small"
          variant="outlined"
          className="todo-textfield"
        />
      ) : (
        // Displays the task text when not editing
        <ListItemText primary={todo.text} />
      )}

      {/* Display the due date */}
      {todo.dueDate && (
        <Typography variant="body2" className="todo-due-date">
          Due: {new Date(todo.dueDate).toLocaleDateString()}
        </Typography>
      )}
      {/* Edit/Save button */}
      <IconButton color="primary" onClick={isEditing ? handleSave : handleEdit}>
        {/* Display Save icon when editing, Edit icon otherwise */}
        {isEditing ? <Save /> : <Edit />}
      </IconButton>

      {/* Delete button */}
      <IconButton color="secondary" onClick={() => deleteTodo(todo.id)}>
        <Delete />
      </IconButton>
    </ListItem>
  );
};

export default TodoItem;
