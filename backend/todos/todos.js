const express = require("express");
const router = express.Router();

const pool = require("../db");

router.get("/todos", async (req, res) => {
  const todos = await pool.query("SELECT * FROM todos");
  // todos = [
  //   { id: 1, name: "Buy groceries", completed: false },
  //   { id: 2, name: "Walk the dog", completed: true },
  // ];
  res.send(todos.rows);
});

module.exports = router;
