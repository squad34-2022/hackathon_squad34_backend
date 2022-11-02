const { PORT } = require("./constants")
const express = require("express")
const userRouter = require("./routes/router")
require("./database")

const app = express()

app.use(express.json())

app.use("/users", userRouter)





// app.get("/", (req, res) => {
//   res.send("GET")
// })

// app.post("/", (req, res) => {
//   res.send("POST")
// })

// app.put("/", (req, res) => {
//   res.send("PUT")
// })

// app.delete("/", (req, res) => {
//   res.send("DEL")
// })

app.listen(PORT, () => {
  console.log(`Server running at htttp://localhost:${PORT}`)
})