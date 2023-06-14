const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const Team = require("../models/team");

//RESET DATABASE

router.post("/reset", async (req, res) => {
  try {
    const team = await Team.deleteMany();
    res.json(team);
  } catch (err) {
    res.json({ message: err });
  }
});

// GET BACK ALL THE POSTS

router.get("/", async (req, res) => {
  try {
    const team = await Team.find({ team1: req.query.team1 });
    console.log(req.query);
    res.json(team);
  } catch (err) {
    res.json({ message: err });
  }
});

//SUBMIT A POST

router.post("/insertteam", async (req, res) => {
  console.log(req.body);
  const team = new Team({
    teamname: req.body.params.teamname,
    country: req.body.params.country,
    teambirthday: req.body.params.teambirthday,
    innerChampionships: req.body.params.innerChampionships,
    championsleague: req.body.params.innerChampionships,
  });
  try {
    const savedTeam = await team.save();
    res.json(savedTeam);
  } catch (err) {
    res.json({ message: err });
  }
});

//SPECIFIC POST

router.get("/:gameId", async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamId);
    res.json(team);
  } catch (err) {
    res.json({ message: err });
  }
});

//DELETE POST
router.delete("/:gameId", async (req, res) => {
  try {
    const removedTeam = await Team.remove({ _id: req.params.teamId });
    res.json(removedTeam);
  } catch (err) {
    res.json({ message: err });
  }
});

//UPDATE POST
router.patch("/:gameId", async (req, res) => {
  try {
    const updatedTeam = await Team.updateOne(
      { _id: req.params.teamId },
      { $set: { innerChampionships: req.body.innerChampionships } }
    );
    res.json(updatedTeam);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
