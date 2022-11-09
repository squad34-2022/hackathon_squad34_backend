const { PORT } = require("./constants");
const express = require("express");
const users = require("./routes/user");
const trails = require("./routes/trail");
const courses = require("./routes/course");
require("./database");

const app = express();

app.use(express.json());

app.use("/users", users);
app.use("/trails", trails);
app.use("/courses", courses);

app.listen(PORT, () => {
  console.log(`Server running at htttp://localhost:${PORT}`);
});
