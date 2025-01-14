const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectiondb = require("./db/db");
const userRoutes = require("./routers/userRoutes");
const app = express();

connectiondb();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/users", userRoutes);

module.exports = app;
