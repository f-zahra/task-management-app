const userModel = require("../models/User");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await userModel.find().exec();

  res.render("user_list", {
    title: "user's list ",
    user_list: users,
  });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.params.userId);
  res.status(200).send(user);
});

//Display User form
exports.createUser_form = (req, res, next) => {
  res.render("user_form", { title: "Create User" });
};

exports.createUser = [
  // Validate and sanitize fields.
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("name must be specified.")
    .isAlpha()
    .withMessage("name is not valid"),

  body("email")
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .normalizeEmail(),

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    const { name, email } = req.body;

    const newUser = new userModel({ name, email });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("user_form", {
        title: "Create User",
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.

      const savedUser = await newUser.save();

      res.redirect("/users");
    }
  }),
];
exports.updateUser = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("name must be specified."),

  body("email")
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .normalizeEmail(),
  asyncHandler(async (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);

    const { name, email } = req.body;

    const userToUpdate = new userModel({ name, email, _id: req.params.userId });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("user_form", {
        title: "Update User",
        errors: errors.array(),
      });
      return;
    } else {
      const updatedUser = await userModel.findByIdAndUpdate(
        req.params.userId,
        userToUpdate
      );
      res.redirect("/users");
    }
  }),
];
exports.get_updateUser_form = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.params.userId);
  res.render("user_form", { title: "Update User", user: user });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const userToDelete = await userModel.findByIdAndDelete(req.params.userId);
  res.redirect("/users");
});
