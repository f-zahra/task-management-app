var createError = require("http-errors");
var express = require("express");
var db = require("./db");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const userModel = require("./models/User");
const taskModel = require("./models/Task");
var app = express();
db();

// Create a new user with tasks

// Create a new user with tasks
const createUser = async () => {
  // Define a new user with embedded tasks
  const newUser = new userModel({
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
  });

  // Save the new user document
  try {
    const savedUser = await newUser.save(); // Use 'await' here because 'save' returns a promise
    console.log("User saved:", savedUser);
  } catch (error) {
    console.error("Error saving user:", error);
  }
};
const createTask = async () => {
  const newTask = new taskModel({
    description: "Complete task 1",
    dueDate: new Date("2024-11-15"), // You can specify the due date
    status: "Not Started",
    priority: "High",
  });

  // Save the new task document
  try {
    const savedTask = await newTask.save();
    console.log("Task saved:", savedTask);
  } catch (error) {
    console.error("Error saving task:", error);
  }
};
// Call the createUser function to create and save the user
//createUser();
//createTask();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
