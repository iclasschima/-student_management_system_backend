const { number, object } = require("joi");
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  firstname: {
    type: String,
    require: true,
    max: 255,
  },
  lastname: {
    type: String,
    require: true,
    max: 255,
  },
  email: {
    type: String,
    require: true,
  },
  cohort: {
    type: Number,
    require: true,
  },
  password: {
    type: String,
    require: true,
    min: 6,
    max: 1024,
  },
  projects: {
    type: Object,
    require: true,
  },
  courses: {
    type: Object,
    require: true,
  },
  no_of_classes: {
    type: Number,
    require: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
