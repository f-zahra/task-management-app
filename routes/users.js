var express = require("express");
const userModel = require("../models/User");
const router = express.Router();
const asyncHandler = require("express-async-handler");

/* GET all users */
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const users = await userModel.find();
    res.status(200).send(users);
  })
);

/* Get a user */
router.get(
  "/:userId",
  asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED");
  })
);

/*POST new user */
router.post(
  "/create",
  asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED");
  })
);
/*UPDATE user*/
router.put(
  "/:userId/update",
  asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED");
  })
);

/*DELETE user */
router.delete(
  "/:userId/delete",
  asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED");
  })
);
module.exports = router;
