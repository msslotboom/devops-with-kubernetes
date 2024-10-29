const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

const todos = [];

app.get("/todos", (req, res) => {
  res.json({ todos });
});

app.post("/todos", (req, res) => {
  const { todo } = req.body;

  if (todo) {
    todos.push(todo);
    res.status(201).json({ message: "Todo added successfully" });
  } else {
    res.status(400).json({ message: "Todo content is required" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
