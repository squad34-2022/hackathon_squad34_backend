const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { response } = require("express");

router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (err) {
    res.status(500).send("Error on application");
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const getUserById = await User.findById(id);
    res.json(getUserById);
  } catch (err) {
    res.status(500).send("Error on application");
  }
});

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await User.create({ name, email, password });
    res.json(newUser);
  } catch (err) {
    res.status(500).send("Error on application");
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).send({ error: "User not found" });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(400).send({ error: "Invalid Password" });
  }

  res.send(user);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  const hashPassword = await bcrypt.hash(password, 10);

  try {
    const updatedUser = await User.findByIdAndUpdate(id, {
      name,
      email,
      password: hashPassword,
    });

    res.json(updatedUser);
  } catch (err) {
    res.status(500).send("Error on application");
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).send("Error on application");
    console.log(err);
  }
});

module.exports = router;
