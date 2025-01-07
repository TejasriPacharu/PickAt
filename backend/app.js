const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectiondb = require("./db/db");

const app = express();

connectiondb();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello word");
});

module.exports = app;
