var express = require("express");
const taskModel = require("../models/Task");
const router = express.Router();
const asyncHandler = require("express-async-handler");

/* GET all tasks */
router.get(
  "/:userId/",
  asyncHandler(async (req, res, next) => {
    const tasks = await taskModel.find({ user: req.params.userId });

    res.status(200).send(tasks);
  })
);

/* Get a task */
router.get(
  "/:userId/:taskId",
  asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED");
  })
);

/*POST new task */
router.post(
  "/:userId/create",
  asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED");
  })
);

/*UPDATE task*/
router.put(
  "/:userId/:taskId/update",
  asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED");
  })
);

/*DELETE task */
router.delete(
  "/:userId/:taskId/delete",
  asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED");
  })
);
module.exports = router;
