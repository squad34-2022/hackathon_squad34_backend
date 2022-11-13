const { Router } = require("express");

const Course = require("../models/Course");
const Trail = require("../models/trail");
const auth = require("../middlewares/auth");

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
      return res.status(422).json({ error: "title is required." });
    }

    if (!type) {
      return res.status(422).json({ error: "Type is required." });
    }

    if (!author) {
      return res.status(422).json({ error: "Author is required." });
    }

    if (!link) {
      return res.status(422).json({ error: "Link is required." });
    }

    if (!trail) {
      return res.status(422).json({ error: "Trail is required." });
    }

    const courseTrail = await Trail.findById(trail);

    if (!courseTrail) {
      return res.status(401).json({ error: "trail not exists" });
    }

    const course = await Course.create({ title, type, author, link, trail });
    await course.save();

    courseTrail.courses.push(course._id);
    await courseTrail.save();

    res.status(201).json({ message: "Course successfully created" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, type, author, link, trail } = req.body;
    const course = {
      title,
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

router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findOne({ _id: id });

    if (!course) {
      return res.status(400).json({ error: "Course not found." });
    }

    if (!course.trail) {
      await Course.findByIdAndDelete(id);

      return res.status(200).json({ message: "Course successfully deleted." });
    }

    const trail = await Trail.findOne(course.trail._id);

    if (trail) {
      const removeCurse = trail.courses.filter(
        (course) => course._id.toString() !== id
      );
      trail.courses = removeCurse;

      await trail.save();
    }

    await Course.findByIdAndDelete(id);

    res.status(200).json({ message: "Course successfully deleted." });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
