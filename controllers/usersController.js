const userModel = require("../models/User");
const asyncHandler = require("express-async-handler");

exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await userModel.find().select("name").exec();

  res.render("user_list", {
    title: "user's list ",
    user_list: users,
  });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.params.userId);
  res.status(200).send(user);
});

exports.createUser = asyncHandler(async (req, res, next) => {
  const { name, email } = req.body;

  const newUser = new userModel({ name, email });

  const savedUser = await newUser.save();
  res.status(201).send(savedUser);
});
exports.updateUser = asyncHandler(async (req, res, next) => {
  const updatedUser = await userModel.findByIdAndUpdate(
    req.params.userId,
    req.body,
    { new: true }
  );
  res.status(200).send(updatedUser);
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const userToDelete = await userModel.findByIdAndDelete(req.params.userId);
  res.status(200).send("user deleted");
});
