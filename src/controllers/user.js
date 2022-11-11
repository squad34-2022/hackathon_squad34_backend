require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();
const User = require("../models/user");
const auth = require("../middlewares/auth");

const { SECRET } = process.env;

function generateToken(params = {}) {
  return jwt.sign(params, SECRET, {
    expiresIn: 86400,
  });
}
router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json(users);
  } catch (err) {
    res.status(401).send("error getting all user");
    console.log(err);
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(401).send({ error: "error getting user by ID" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (await User.findOne({ email }).select("password")) {
      return res.status(401).send({ error: "User already Exists" });
    }
    const user = await User.create({ name, email, password });
    /* user.password = undefined; */
    res.json({ user, token: generateToken({ id: user._id }) });
  } catch (err) {
    res.status(401).send({ error: "Error on Register User" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).send({ error: "User not found" });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(401).send({ error: "Invalid Password" });
  }

  user.password = undefined;

  res.send({ user, token: generateToken({ id: user._id }) });
});

router.put("/:id", auth, async (req, res) => {
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
    res.status(401).send({ error: "error update user" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id).select("-password");

    res.json(user);
  } catch (err) {
    res.status(401).send({ error: "error deleting user" });
    console.log(err);
  }
});

module.exports = router;
