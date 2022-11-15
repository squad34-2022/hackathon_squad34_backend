const { Router } = require("express");

const Course = require("../models/Course");
const Trail = require("../models/trail");
const auth = require("../middlewares/auth");
const { reset } = require("nodemon");

const router = new Router();

router.get("/", async (req, res) => {
  try {
    const allCourses = await Course.find().populate({
      path: "trail",
      select: "title",
    });

    res.status(200).json(allCourses);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    if (!course) {
      res.status(424).json({ message: "Course not found" });
      return;
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { title, type, author, link, trail } = req.body;

    if (!title) {
      return res.status(422).json({ error: "title é requerido." });
    }

    if (!type) {
      return res.status(422).json({ error: "Type é requerido." });
    }

    if (!author) {
      return res.status(422).json({ error: "Author é requerido." });
    }

    if (!link) {
      return res.status(422).json({ error: "Link é requerido." });
    }

    if (!trail) {
      return res.status(422).json({ error: "Trail é requerido." });
    }

    const courseTrail = await Trail.findById(trail);

    if (!courseTrail) {
      return res.status(401).json({ error: "Trilha não Existe" });
    }

    const course = await Course.create({ title, type, author, link, trail });
    await course.save();

    courseTrail.courses.push(course._id);
    await courseTrail.save();

    res.status(201).json({ message: "Curso Criado com Sucesso." });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, type, author, link, trail } = req.body;

    const newCourse = {
      title,
      type,
      author,
      link,
      trail,
    };

    const course = await Course.findByIdAndUpdate(id, newCourse);

    if (!course) {
      return res.status(404).send({ error: "Curso não Existe..." });
    }

    const newTrail = await Trail.updateOne(
      { _id: trail },
      { $push: { courses: id } }
    );

    const currentTrail = await Trail.updateOne(
      { _id: course.trail._id },
      { $pull: { courses: id } }
    );

    return res.status(200).send(course);
  } catch (error) {
    res.status(500).send({ error: "Erro ao Atualizar Cursos." });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findOne({ _id: id });

    if (!course) {
      return res.status(400).json({ error: "Course not found." });
    }

    if (!course.trail) {
      await Course.findByIdAndDelete(id);

      return res.status(200).json({ message: "Curso Deletado com Sucesso." });
    }

    const trail = await Trail.findOne(course.trail._id);

    if (trail) {
      await Trail.updateOne(
        { _id: course.trail._id },
        { $pull: { courses: id } }
      );
    }

    await Course.findByIdAndDelete(id);

    res.status(200).json({ message: "Curso Deletado com Sucesso." });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
