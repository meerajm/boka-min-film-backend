const mongoose = require("mongoose");

const ShowSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  showDay: { type: String, required: true },
  startTime: { type: String, required: true },
  movieTitle: { type: String, required: true },
  screen: { type: Number, required: true },
  bookedSeats: [{ type: String, required: true }],
});

module.exports = {
  Show: mongoose.model("Show", ShowSchema),
  ShowSchema,
};
