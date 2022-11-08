const { Router } = require("express");
const userRouter = new Router();
const UserModel = require("../models/userModel");

userRouter.get("/", async (req, res) => {
  try {
    const allUsers = await UserModel.find();
    res.json(allUsers);
  } catch (err) {
    res.status(500).send("Error on application");
    console.log(err);
  }
});

userRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const getUserById = await UserModel.findById(id);
    res.json(getUserById);
  } catch (err) {
    res.status(500).send("Error on application");
  }
});

userRouter.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await UserModel.create({ name, email, password });
    res.json(newUser);
  } catch (err) {
    res.status(500).send("Error on application");
    console.log(err);
  }
});

userRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(id, {
      name,
      email,
      password,
    });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).send("Error on application");
    console.log(err);
  }
});

userRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).send("Error on application");
    console.log(err);
  }
});

module.exports = userRouter;
