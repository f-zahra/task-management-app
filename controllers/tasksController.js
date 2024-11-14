const taskModel = require("../models/Task");
const userModel = require("../models/User");
const asyncHandler = require("express-async-handler");

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
  const allUsers = await userModel.find().exec();
  const users = res.render("task_form", {
    title: "Create Task",
    today: today,
    users: allUsers,
  });
});
exports.createTask = asyncHandler(async (req, res, next) => {
  const { description, dueDate, status, priority, user } = req.body;

  const newTask = new taskModel({
    description,
    dueDate,
    status,
    priority,
    user,
  });

  const savedTask = await newTask.save();

  return res.status(201).json(savedTask);
});

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
