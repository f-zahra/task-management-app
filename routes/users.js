var express = require("express");
const userModel = require("../models/User");
const router = express.Router();

/* GET all users */
router.get("/", async (req, res) => {
  try {
    const users = await userModel.find();
    console.log(users);
  } catch (err) {
    console.error(err);
  }
});

/* Get a user */
router.get("/users/:userId", function (req, res, next) {
  //TODO
});

/*POST new user */
router.post("/users", (req, res) => {
  //TODO
});
/*UPDATE user*/
router.put("/users/:userId", (req, res) => {
  //TODO
});

/*DELETE user */
router.delete("/users/:userId", (req, res) => {
  //TODO
});
module.exports = router;
