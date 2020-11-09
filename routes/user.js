const express = require("express");
const verify = require("../helpers/verifyToken");
const { validateProject } = require("../helpers/validate");
const User = require("../models/user");

const router = express.Router();

router.post("/add_project", verify, async (req, res) => {
  const { error } = validateProject(req.body);

  if (error) {
    const { details } = error;
    res.send(details[0]);
  }

  const user = await User.findOne({ _id: req.body.user_id });

  user.projects = [
    ...user.projects,
    { title: req.body.title, start_date: req.body.start_date, date: Date.now },
  ];

  try {
    const response = await user.save();
    return res.send(response);
  } catch (error) {
    return res.send(error);
  }
});

module.exports = router;
