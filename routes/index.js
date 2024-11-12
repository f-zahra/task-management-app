var express = require("express");
var router = express.Router();
const taskModel = require("../models/Task");
const userModel = require("../models/User");
const asyncHandler = require("express-async-handler");

/* GET home page. */
router.get(
  "/",
  asyncHandler(async function (req, res, next) {
    const [numUsers, numTasks] = await Promise.all([
      userModel.countDocuments().exec(),
      taskModel.countDocuments().exec(),
    ]);
    res.render("index", {
      title: "Task manager ",
      user_count: numUsers,
      task_count: numTasks,
    });
  })
);

module.exports = router;
