var express = require("express");
const userModel = require("../models/User");
const router = express.Router();

/* GET all users */
router.get("/", async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(404).send("not found");
  }
});

/* Get a user */
router.get("/:userId", function (req, res, next) {
  //TODO
});

/*POST new user */
router.post("/create", (req, res) => {
  //TODO
});
/*UPDATE user*/
router.put("/:userId/update", (req, res) => {
  //TODO
});

/*DELETE user */
router.delete("/:userId/delete", (req, res) => {
  //TODO
});
module.exports = router;
