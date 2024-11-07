var createError = require("http-errors");
var express = require("express");
var db = require("./db");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const userModel = require("./models/User");
var app = express();
db();

// Create a new user with tasks

// Create a new user with tasks
const createUser = async () => {
  // Define a new user with embedded tasks
  const newUser = new userModel({
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    tasks: [
      {
        description: "Complete task 1",
        dueDate: new Date("2024-11-15"), // You can specify the due date
        status: "Not Started",
        priority: "High",
      },
      {
        description: "Complete task 2",
        dueDate: new Date("2024-11-20"),
        status: "In Progress",
        priority: "Medium",
      },
    ],
  });

  // Save the new user document
  try {
    const savedUser = await newUser.save(); // Use 'await' here because 'save' returns a promise
    console.log("User saved:", savedUser);
  } catch (error) {
    console.error("Error saving user:", error);
  }
};

// Call the createUser function to create and save the user
createUser();
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
