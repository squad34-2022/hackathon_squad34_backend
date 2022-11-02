const { MONGO_URI } = require("./constants")
const { PORT } = require("./constants")
const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

const connect = async () => {
    await mongoose.connect(MONGO_URI)
    console.log("Connected to database!")
  
}

connect()

app.get("/", (req, res) => {
  res.send("GET")
})

app.post("/", (req, res) => {
  res.send("POST")
})

app.put("/", (req, res) => {
  res.send("PUT")
})

app.delete("/", (req, res) => {
  res.send("DEL")
})

app.listen(PORT, () => {
  console.log(`Server running at htttp://localhost:${PORT}`)
})