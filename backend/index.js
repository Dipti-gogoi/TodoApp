const express = require("express");
const setupMiddleware = require("./middleware/setupMiddleware");
const todoRoutes = require("./middleware/handleRoutes");

const app = express();

// Setup middleware
setupMiddleware(app);

// Default route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Use todo routes
app.use(todoRoutes);

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
