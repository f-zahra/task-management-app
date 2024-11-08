var express = require("express");
const taskModel = require("../models/Task");
const router = express.Router();

/* GET all tasks */
router.get("/:userId/", async (req, res) => {
  try {
    const tasks = await taskModel.find({ user: req.params.userId });

    res.status(200).send(tasks);
  } catch (err) {
    res.status(404).send("not found");
  }
});

/* Get a task */
router.get("/:userId/:taskId", function (req, res, next) {
  //TODO
});

/*POST new task */
router.post("/:userId/create", (req, res) => {
  //TODO
});
/*UPDATE task*/
router.put("/:userId/:taskId/update", (req, res) => {
  //TODO
});

/*DELETE task */
router.delete("/:userId/:taskId/delete", (req, res) => {
  //TODO
});
module.exports = router;
