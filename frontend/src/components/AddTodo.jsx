import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// Component for adding a new to-do item
const AddTodo = ({ addText }) => {
 // State to manage task text and due date
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState(null);

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
  // Passes the new task to the parent component
    addText(text, dueDate);
  // Clears the input field after submission
    setText("");
    setDueDate(null);
  };

  return (
    <form className="add-todo-form" onSubmit={handleSubmit}>
      <div className="input-container">
        
        {/* Input field for task text */}
        <TextField
          label="Add a task..."
          variant="outlined"
          size="small"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="input-field"
        />
        {/* Date picker for selecting due date */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Due Date"
            value={dueDate}
            onChange={(newDate) => setDueDate(newDate)}
            slotProps={{ textField: { size: "small" } }}
          />
        </LocalizationProvider>

        <Button type="submit" variant="contained" color="primary">
          Add
        </Button>
      </div>
    </form>
  );
};

export default AddTodo;
