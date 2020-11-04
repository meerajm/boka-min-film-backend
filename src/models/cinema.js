const mongoose = require("mongoose");
const { ShowSchema } = require("./showDetails");

const CinemaSchema = new mongoose.Schema({
  cinemaName: { type: String, required: true },
  showDetails: [ShowSchema],
});

module.exports = mongoose.model("Cinema", CinemaSchema);