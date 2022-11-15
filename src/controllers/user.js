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
    res.status(500).send({ error: err });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).send({ error: "Usuário não encontrado." });
    }
    return res.status(200).send(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      return res.status(400).send({ error: "O nome é requerido" });
    }

    if (!email) {
      return res.status(400).send({ error: "O email é requerido" });
    }

    if (!password) {
      return res.status(400).send({ error: "A Senha é requerida" });
    }

    if (await User.findOne({ email })) {
      return res.status(401).send({ error: "Usuário já existe" });
    }

    const user = await User.create({ name, email, password });
    user.password = undefined;

    return res.json({ user, token: generateToken({ id: user._id }) });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .send({ error: "Usuario não existe, por favor cadastre-se" });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .send({ error: "Senha Inválida, tente novamente!" });
    }

    user.password = undefined;

    return res.send({ user, token: generateToken({ id: user._id }) });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    if (!password) {
      return res.status(400).send({ error: "Senha é requerida." });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.findByIdAndUpdate(id, {
      name,
      email,
      password: hashPassword,
    });

    if (!user) {
      return res.status(404).send({ error: "Usuário não encontrado." });
    }

    res.status(200).send("Usuário Atualizado.");
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id).select("-password");

    if (!user) {
      return res.status(404).send({ error: "Usuário não encontrado." });
    }

    return res.status(200).send(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
