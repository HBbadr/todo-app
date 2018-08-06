const express = require("express");
const todoControllers = require('./controllers/todoController');

const app = express();

// Set up the template engine

app.set("view engine", "ejs");

// static files

app.use(express.static("./public"));

// calling our todoControllers function

todoControllers(app);

//listening post 3000

app.listen(3000, () => console.log("listening on port 3000..."));