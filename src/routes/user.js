const { Router } = require("express");
const router = new Router();
const User = require("../models/user");

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

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, {
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
