require("dotenv").config();
require("./config/database");
const express = require("express");

const { PORT } = process.env;

const users = require("./controllers/user");
const trails = require("./controllers/trail");
const courses = require("./controllers/course");

const app = express();

app.use(express.json());

app.use("/users", users);
app.use("/trails", trails);
app.use("/courses", courses);

app.listen(PORT, () => {
  console.log(`Server running at htttp://localhost:${PORT}`);
});
