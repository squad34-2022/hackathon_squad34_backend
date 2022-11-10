require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();
const User = require("../models/user");

const { SECRET } = process.env;

function generateToken(params = {}) {
  return jwt.sign(params, SECRET, {
    expiresIn: 86400,
  });
}
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
  try {
    const { id } = req.params;
    const getUserById = await User.findById(id);
    res.json(getUserById);
  } catch (err) {
    res.status(400).send({ error: "error getting user" });
  }
});

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (await User.findOne({ email })) {
      return res.status(400).send({ error: "User already Exists" });
    }
    const user = await User.create({ name, email, password });
    user.password = undefined;
    res.json({ user, token: generateToken({ id: user._id }) });
  } catch (err) {
    res.status(400).send({ error: "Error on Register User" });
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

  user.password = undefined;

  res.send({ user, token: generateToken({ id: user._id }) });
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(id, {
      name,
      email,
      password: hashPassword,
    });

    res.status(200).send("User updated successfully");
  } catch (err) {
    res.status(400).send({ error: "error update user" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    res.json(deletedUser);
  } catch (err) {
    res.status(400).send({ error: "error deleting user" });
    console.log(err);
  }
});

module.exports = router;
