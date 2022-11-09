const { Router, json } = require("express");
const Course = require("../models/Course");
const Trail = require("../models/trail");
const router = new Router();

router.get("/", async (req, res) => {
  try {
    const allCourses = await Course.find();
    res.status(200).json(allCourses);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getCourseById = await Course.findById(id);
    if (!getCourseById) {
      res.status(424).json({ message: "Course not found" });
      return;
    }
    res.status(200).json(getCourseById);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, type, author, link, trail } = req.body;

    /* if (!name) {
      res.status(422).json({ error: "Name is required." });
      return;
    }

    if (!type) {
      res.status(422).json({ error: "Type is required." });
      return;
    }

    if (!author) {
      res.status(422).json({ error: "Author is required." });
      return;
    }

    if (!link) {
      res.status(422).json({ error: "Link is required." });
      return;
    }
    if (!trail) {
      res.status(422).json({ error: "Trail is required." });
      return;
    } */

    const course = await Course.create({ name, type, author, link, trail });
    await course.save();

    const courseTrail = await Trail.findById(trail);

    courseTrail.courses.push(course._id);
    await courseTrail.save();

    res.status(201).json({ message: "Course successfully created" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, author, link, trail } = req.body;
    const course = {
      name,
      type,
      author,
      link,
      trail,
    };
    const updatedCourse = await Course.updateOne({ _id: id }, course);
    if (updatedCourse.matchedCount == 0) {
      res.status(424).json({ message: "Course not found." });
      return;
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findOne({ _id: id });

    const trail = await Trail.findOne(course.trail._id);

    const removeCurse = trail.courses.filter(
      (course) => course._id.toString() !== id
    );

    trail.courses = [...removeCurse];

    await Course.findByIdAndDelete(id);
    await trail.save();
    res.status(200).json({ message: "Course successfully deleted." });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
