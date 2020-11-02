const mongoose = require("mongoose");

const ShowTimeSchema = new mongoose.Schema({
  startTime:{ type: String, required: true },
  movieTitle: { type: String, required: true },
  bookedSeats:[{ type: String, required: true }],
});

module.exports = {
  ShowTime: mongoose.model("ShowTime", ShowTimeSchema),
  ShowTimeSchema,
};