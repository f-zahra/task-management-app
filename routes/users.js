var express = require("express");

const router = express.Router();
const usersController = require("../controllers/usersController");

/* GET all users */
router.get("/", usersController.getAllUsers);

/* Get a user */
router.get("/:userId", usersController.getUser);

/*POST new user */
router.post("/create", usersController.createUser);
/*UPDATE user*/
router.put("/:userId/update", usersController.updateUser);

/*DELETE user */
router.delete("/:userId/delete", usersController.deleteUser);
module.exports = router;
