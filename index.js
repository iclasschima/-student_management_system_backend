const express = require("express");
const Auth = require("./routes/auth");
const User = require("./routes/user");
const Index = require("./routes/index");
const Message = require("./routes/message");
require("dotenv/config");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/auth", Auth);
app.use("/api/user", User);
app.use("/api/message", Message);
app.use("/api/", Index);

app.get("/", (req, res) => res.send("Hello there"));

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("db connected")
);

const PORT = process.env.PORT || 8000

app.listen(PORT, function() {
  console.log("Server started.......");
});
