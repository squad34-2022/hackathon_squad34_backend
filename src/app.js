const { PORT } = require("./constants")
const express = require("express")
const userRouter = require("./routes/router")
require("./database")

const app = express()

app.use(express.json())

app.use("/users", userRouter)

app.listen(PORT, () => {
  console.log(`Server running at htttp://localhost:${PORT}`)
})