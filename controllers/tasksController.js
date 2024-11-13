const taskModel = require("../models/Task");
const asyncHandler = require("express-async-handler");

exports.getAllTasks = asyncHandler(async (req, res, next) => {
  const tasks = await taskModel.find({ user: req.params.userId });

  res.render("task_list", {
    title: "task list ",
    task_list: tasks,
  });
});

exports.getTask = asyncHandler(async (req, res, next) => {
  const task = await taskModel.findById(req.params.taskId);

  res.status(200).send(task);
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
