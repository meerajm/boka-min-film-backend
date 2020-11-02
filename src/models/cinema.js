const mongoose = require("mongoose");
const { ShowSchema } = require("./showData");

const CinemaSchema = new mongoose.Schema({
  cinemaName: { type: String, required: true },
  showData: [ShowSchema],
});

module.exports = mongoose.model("Cinema", CinemaSchema);