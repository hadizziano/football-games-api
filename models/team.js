const mongoose = require("mongoose");

const TeamSchema = mongoose.Schema({
  teamname: { type: "string", required: true },
  country: { type: "string", required: true },
  teambirthday: (type = String),
  innerChampionships: (type = String),
  championsleague: (type = String),
});

module.exports = mongoose.model("team", TeamSchema);
