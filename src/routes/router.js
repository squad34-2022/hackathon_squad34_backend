const { Router } = require("express")
const userRouter = new Router()
const UserModel = require("../models/userModel")

userRouter.get("/", async (req,res) => {
  const allUsers = await UserModel.find()
  res.json("type: GET")
})

userRouter.post("/post", async (req,res) => {
  const allUsers = await UserModel.find()
  res.json("type: POST")
})

userRouter.put("/put", async (req,res) => {
  const allUsers = await UserModel.find()
  res.json("type: PUT")
})

userRouter.delete("/delete", async (req,res) => {
  const allUsers = await UserModel.find()
  res.json("type: DELETE")
})

module.exports = userRouter