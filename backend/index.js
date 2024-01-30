const express = require("express");
const todosRouter = require("./todos/todos");

const app = express();
const port = 3001;

app.use("/", todosRouter);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
