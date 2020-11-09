const express = require("express");
const verify = require("../helpers/verifyToken")
const router = express.Router();

const User = require("../models/user");

router.get("/users", verify, async (req, res) => {
  const user = await User.find();

  return res.send(user);
});

module.exports = router;
