var express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasksController");

/* GET all tasks */
router.get("/", tasksController.getAllTasks);
/*GET task form*/
router.get("/create-task", tasksController.get_createTask);
/* GET all tasks of a single user*/
router.get("/:userId/", tasksController.getAllUserTasks);

/* Get a task */
router.get("/:userId/:taskId", tasksController.getTask);

/*POST new task */
router.post("/:userId/create", tasksController.createTask);

/*UPDATE task*/
router.put("/:userId/:taskId/update", tasksController.updateTask);

/*DELETE task */
router.delete("/:userId/:taskId/delete", tasksController.deleteTask);
module.exports = router;
