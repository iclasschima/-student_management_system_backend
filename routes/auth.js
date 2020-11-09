const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { validateRegister, validateLogin } = require("../helpers/validate");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { error } = validateLogin(req.body);

  if (error) {
    const { details } = error;
    return res.status(200).json(details[0].message);
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.send(200).send({
      status: "error",
      message: "User does not exist",
    });
  }

  const passwordMatch = await bcrypt.compare(req.body.password, user.password);

  if (!passwordMatch) {
    return res.send({
      status: "error",
      message: "Incorrect login details",
    });
  }

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

  return res.status(200).header("auth-token", token).send({
    status: "success",
    message: "Welcome to your dashboard",
    data: { token, user },
  });
});

router.post("/register", async (req, res) => {
  const { error } = validateRegister(req.body);

  if (error) {
    const { details } = error;
    res.send(details[0]);
  }

  const userExist = await User.findOne({ email: req.body.email });

  if (userExist) {
    return res.status(200).send({
      message: "User already exist",
    });
  }

  const salt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    ...req.body,
    password: hashedPassword,
    projects: [],
    courses: [],
    no_of_classes: 0,
  });

  try {
    const response = await user.save();
    return res.status(200).json({
      status: "success",
      message: "Account created successfully",
      data: response,
    });
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
