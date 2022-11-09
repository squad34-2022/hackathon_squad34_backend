const { Router } = require("express");
const router = new Router();
const Trail = require("../models/trail");

router.get("/", async (req, res) => {
  try {
    const allTrails = await Trail.find();
    res.json(allTrails);
  } catch (err) {
    res.status(500).send("Error querying the trail" + err);
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getTrailById = await Trail.findById(id);
    res.json(getTrailById);
  } catch (err) {
    res.status(500).send("Error querying trail by id" + err);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;
    const newTrail = await Trail.create({ name, description });
    res.json(newTrail);
  } catch (err) {
    res.status(500).send("Error registering the track!" + err);
    console.log(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const updatedTrail = await Trail.findByIdAndUpdate(id, {
      name,
      description,
    });
    res.json(updatedTrail);
  } catch (err) {
    res.status(500).send("Error updating trail" + err);
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTrail = await Trail.findByIdAndDelete(id);
    res.json(deletedTrail);
  } catch (err) {
    res.status(500).send("Error deleting trail" + err);
    console.log(err);
  }
});

module.exports = router;
