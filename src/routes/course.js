const { Router, json } = require("express");
const CourseModel = require("../models/courseModel");
const courseRouter = new Router();

courseRouter.get("/", async (req, res) => {
  try {
    const allCourses = await CourseModel.find();
    res.status(200).json(allCourses);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

courseRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const getCourseById = await CourseModel.findById(id);
    if (!getCourseById) {
      res.status(424).json({ message: "Course not found" });
      return;
    }
    res.status(200).json(getCourseById);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

courseRouter.post("/", async (req, res) => {
  const { name, type, author, duration, link } = req.body;

  if (!name) {
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

  if (!duration) {
    res.status(422).json({ error: "Duration is required." });
    return;
  }

  if (!link) {
    res.status(422).json({ error: "Link is required." });
    return;
  }

  const newCourse = {
    name,
    type,
    author,
    duration,
    link,
  };

  try {
    await CourseModel.create(newCourse);
    res.status(201).json({ message: "Course successfully created" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

courseRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, type, author, duration, link } = req.body;
  const course = {
    name,
    type,
    author,
    duration,
    link,
  };
  try {
    const updatedCourse = await CourseModel.updateOne({ _id: id }, course);
    if (updatedCourse.matchedCount == 0) {
      res.status(424).json({ message: "Course not found." });
      return;
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

courseRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const course = await CourseModel.findOne({ _id: id });
  if (!course) {
    res.status(424).json({ message: "Course not found." });
    return;
  }

  try {
    await CourseModel.deleteOne({ _id: id });
    res.status(200).json({ message: "Course successfully deleted." });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = courseRouter;
