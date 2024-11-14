var express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasksController");

/* GET all tasks */
router.get("/", tasksController.getAllTasks);
/*GET task form*/
router.get("/create-task", tasksController.get_createTask);
/*POST new task */
router.post("/create-task", tasksController.createTask);
/* GET all tasks of a single user*/
router.get("/:userId/", tasksController.getAllUserTasks);

/*UPDATE task*/
router.put("/update-task", tasksController.updateTask);

/*DELETE task */
router.delete("/delete-task", tasksController.deleteTask);
module.exports = router;
