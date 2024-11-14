const taskModel = require("../models/Task");
const userModel = require("../models/User");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const all_users = () => {
  const allUsers = userModel.find();
  return allUsers;
};
exports.getAllTasks = asyncHandler(async (req, res, next) => {
  const tasks = await taskModel.find();

  res.render("task_list", {
    title: "task list ",
    task_list: tasks,
  });
});

exports.getAllUserTasks = asyncHandler(async (req, res, next) => {
  const tasks = await taskModel.find({ user: req.params.userId });

  res.status(200).send(tasks);
});

exports.getTask = asyncHandler(async (req, res, next) => {
  const task = await taskModel.findById(req.params.taskId);

  res.status(200).send(task);
});

exports.get_createTask = asyncHandler(async (req, res, next) => {
  const today = new Date().toISOString().split("T")[0];
  const users_list = await all_users();
  console.log(users_list);
  res.render("task_form", {
    title: "Create Task",
    today: today,
    users: users_list,
  });
});
exports.createTask = [
  // Validate and sanitize the "description" field
  body("description")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Description is required.")
    .escape(),

  // Validate "dueDate" field to be a valid date and not before today
  body("dueDate")
    .isISO8601()
    .withMessage("Please provide a valid date.")
    .custom((value) => {
      const today = new Date().toISOString().split("T")[0];
      return value >= today;
    })
    .withMessage("Due date cannot be in the past."),

  // Validate "status" to be one of the specified options
  body("status")
    .isIn(["not started", "in progress", "ompleted"])
    .withMessage("Invalid status selected."),

  // Validate "priority" to be one of the specified options
  body("priority")
    .isIn(["low", "medium", "high"])
    .withMessage("Invalid priority selected."),

  // Validate "selectedUser" as a MongoDB ObjectId
  body("selectedUser")
    .trim()
    .custom((value) => {
      const id = value;
      const isValid = /^[a-fA-F0-9]{24}$/.test(id);
      return isValid;
    })
    .withMessage("Invalid user selected."),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const users_list = await all_users();
      const today = new Date().toISOString().split("T")[0];
      res.render("task_form", {
        users: users_list,
        errors: errors.array(),
        today: today,
      });
    } else {
      const { description, dueDate, status, priority, selectedUser } = req.body;

      const newTask = new taskModel({
        description,
        dueDate,
        status,
        priority,
        user: selectedUser,
      });

      const savedTask = await newTask.save();

      return res.redirect("/tasks");
    }
  }),
];

exports.updateTask = asyncHandler(async (req, res, next) => {
  const updatedTask = await taskModel.findByIdAndUpdate(
    req.params.taskId,
    req.body,
    { new: true }
  );
  res.status(200).send(updatedTask);
});

exports.deleteTask = asyncHandler(async (req, res, next) => {
  const taskToDelete = await taskModel.findByIdAndDelete(req.params.taskId);

  res.status(200).send("task deleted");
});
