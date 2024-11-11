const taskModel = require("../models/Task");
const asyncHandler = require("express-async-handler");

exports.getAllTasks = asyncHandler(async (req, res, next) => {
  const tasks = await taskModel.find({ user: req.params.userId });

  res.status(200).send(tasks);
});

exports.getTask = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED");
});

exports.createTask = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED");
});

exports.updateTask = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED");
});

exports.deleteTask = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED");
});
