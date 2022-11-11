const { Router } = require("express");
const router = new Router();
const Trail = require("../models/trail");
const auth = require("../middlewares/auth");

router.get("/", async (req, res) => {
  try {
    const allTrails = await Trail.find();
    res.json(allTrails);
  } catch (err) {
    +res.status(500).send("Error querying the trail" + err);
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

router.post("/", auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTrail = await Trail.create({ title, description });
    res.json(newTrail);
  } catch (err) {
    res.status(500).send("Error registering the track!" + err);
    console.log(err);
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const updatedTrail = await Trail.findByIdAndUpdate(id, {
      title,
      description,
    });

    res.json(updatedTrail);
  } catch (err) {
    res.status(500).send("Error updating trail" + err);
    console.log(err);
  }
});

router.delete("/:id", auth, async (req, res) => {
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
