const express = require("express");
const verify = require("../helpers/verifyToken");
const router = express.Router();
const moment = require("moment");

const { validateMessage } = require("../helpers/validate");

const User = require("../models/user");

router.get("/messages/:id", verify, async (req, res) => {
  try {
    const user = await User.find({ _id: req.params.id });
    return res.json(user.messages);
  } catch (error) {
    return res.send(error);
  }
});

router.post("/send", verify, async (req, res) => {
  const { error } = validateMessage(req.body);
  const date = moment().format("LL");
  const time = moment().format("LTS");
  if (error) {
    return res.send(error.details[0].message);
  }

  const { user_id, reciever_id, message } = req.body;

  if (user_id == reciever_id) {
    return res.send({
      status: "error",
      message: "Cannot send message to self",
    });
  }

  try {
    const reciever = await User.findOne({ _id: reciever_id });


  } catch (error) {
    return res.send(error);
  }
});

module.exports = router;
