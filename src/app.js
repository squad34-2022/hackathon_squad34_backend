require("dotenv").config();
require("./config/database");
const express = require("express");
const cors = require("cors");

const { PORT } = process.env;

const users = require("./controllers/user");
const trails = require("./controllers/trail");
const courses = require("./controllers/course");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/teste", (req, res) => {
  res.json({ message: "Conectado ao Backend" });
});

app.use("/users", users);
app.use("/trails", trails);
app.use("/courses", courses);

app.listen(PORT, () => {
  console.log(`Server running at htttp://localhost:${PORT}`);
});
