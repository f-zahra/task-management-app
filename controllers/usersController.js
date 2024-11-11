const userModel = require("../models/User");
const asyncHandler = require("express-async-handler");

exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await userModel.find();
  res.status(200).send(users);
});

exports.getUser = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED");
});

exports.createUser = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED");
});
exports.updateUser = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED");
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED");
});
