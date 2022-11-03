const { PORT } = require("./constants");
const express = require("express");
const userRouter = require("./routes/router");
const trailRouter = require("./routes/trail");
const courseRouter = require("./routes/course")
require("./database");

const app = express();

app.use(express.json());

app.use("/users", userRouter);
app.use("/trails", trailRouter);
app.use("/courses", courseRouter);

app.listen(PORT, () => {
  console.log(`Server running at htttp://localhost:${PORT}`);
});
