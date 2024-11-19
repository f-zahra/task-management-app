var express = require("express");

const router = express.Router();
const usersController = require("../controllers/usersController");

/* GET all users */
router.get("/", usersController.getAllUsers);

/*Get user form */
router.get("/create", usersController.createUser_form);

/* Get a user */
router.get("/:userId", usersController.getUser);

/*POST new user */
router.post("/create", usersController.createUser);

/*UPDATE user*/
router.put("/:userId/update", usersController.updateUser);
router.get("/:userId/update", usersController.get_updateUser_form);
/*DELETE user */
router.delete("/:userId/delete", usersController.deleteUser);
module.exports = router;
