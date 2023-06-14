const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const Game = require("../models/games");
const Team = require("../models/team");

//RESET DATABASE

router.post("/reset", async (req, res) => {
  try {
    const games = await Game.deleteMany();
    res.json(games);
  } catch (err) {
    res.json({ message: err });
  }
});

// GET BACK ALL THE POSTS

router.get("/", async (req, res) => {
  try {
    const games = await Game.find({ team1: req.query.team1 });
    const team = await Team.find({ country: req.query.country });
    console.log(req.query);
    // console.log("teams for this country are", team);
    res.json({ games: games, team: team });
  } catch (err) {
    res.json({ message: err });
  }
});

//SUBMIT A POST

router.post("/insertgame", async (req, res) => {
  console.log(req.body);
  const game = new Game({
    gamedate: req.body.params.gamedate,
    team1: req.body.params.team1,
    team2: req.body.params.team2,
    gameResult: req.body.params.gameResult,
    scorrers: req.body.params.scorrers,
  });
  try {
    const savedGame = await game.save();
    res.json(savedGame);
  } catch (err) {
    res.json({ message: err });
  }
});

//SPECIFIC POST

router.get("/:gameId", async (req, res) => {
  try {
    const game = await Game.findById(req.params.gameId);
    res.json(game);
  } catch (err) {
    res.json({ message: err });
  }
});

//DELETE POST
router.delete("/:gameId", async (req, res) => {
  try {
    const removedGame = await Game.remove({ _id: req.params.gameId });
    res.json(removedGame);
  } catch (err) {
    res.json({ message: err });
  }
});

//UPDATE POST
router.patch("/:gameId", async (req, res) => {
  try {
    const updatedGame = await Game.updateOne(
      { _id: req.params.gameId },
      { $set: { gameResult: req.body.gameResult } }
    );
    res.json(updatedGame);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
