const { Router } = require("express");
const router = new Router();
const Trail = require("../models/trail");
const Course = require("../models/Course");
const auth = require("../middlewares/auth");

router.get("/", async (req, res) => {
  try {
    const allTrails = await Trail.find().populate("courses");
    res.json(allTrails);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const trail = await Trail.findById(id).populate("courses");

    if (!trail) {
      return res.status(404).send({ error: "A trilha não existe." });
    }

    res.json(trail);
  } catch (err) {
    res.status(400).send({ error: "Erro ao consultar Trilha" });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(401).send({ error: "Titulo é requerido." });
    }

    if (!description) {
      return res.status(401).send({ error: "Descrição é requerida." });
    }

    const trail = await Trail.create({ title, description });

    res.status(200).send(trail);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const trail = await Trail.findByIdAndUpdate(id, {
      title,
      description,
    });

    if (!trail) {
      res.status(409).send({ error: "Trilha não existe." });
    }

    res.json(trail);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const trail = await Trail.findByIdAndDelete(id);

    if (!trail) {
      return res.status(404).send({ error: "Trilha não existe..." });
    }

    if (trail.courses.length > 0) {
      trail.courses.map(async () => {
        await Course.deleteMany({ trail: id });
      });
    }
    res.status(200).send(trail);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
