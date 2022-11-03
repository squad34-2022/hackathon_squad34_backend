const { Router } = require("express");
const trailRouter = new Router();
const TrailModel = require("../models/trailModel");

trailRouter.get("/", async (req, res) => {
  try {
    const allTrails = await TrailModel.find();
    res.json(allTrails);
  } catch (err) {
    res.status(500).send("Error querying the trail" + err);
    console.log(err);
  }
});

trailRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const getTrailById = await TrailModel.findById(id);
    res.json(getTrailById);
  } catch (err) {
    res.status(500).send("Error querying trail by id" + err);
  }
});

trailRouter.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    const newTrail = await TrailModel.create({ name });
    console.log(newTrail);
    res.json(newTrail);
  } catch (err) {
    res.status(500).send("Error registering the track!" + err);
    console.log(err);
  }
});

trailRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedTrail = await TrailModel.findByIdAndUpdate(id, { name });
    res.json(updatedTrail);
  } catch (err) {
    res.status(500).send("Error updating trail" + err);
    console.log(err);
  }
});

trailRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTrail = await TrailModel.findByIdAndDelete(id);
    res.json(deletedTrail);
  } catch (err) {
    res.status(500).send("Error deleting trail" + err);
    console.log(err);
  }
});

module.exports = trailRouter;
