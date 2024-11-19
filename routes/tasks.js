var express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasksController");

/*DELETE task */
router.post("/:taskId/delete-task", tasksController.deleteTask);
/*GET update task form*/
router.get("/:taskId/update-task", tasksController.get_updateTask);

/*UPDATE task*/
router.post("/:taskId/update-task", tasksController.updateTask);
/* GET all tasks of a single user*/
router.get("/:userId/", tasksController.getAllUserTasks);
/* GET all tasks */
router.get("/", tasksController.getAllTasks);
/*GET task form*/
router.get("/create-task", tasksController.get_createTask);
/*POST new task */
router.post("/create-task", tasksController.createTask);
module.exports = router;
