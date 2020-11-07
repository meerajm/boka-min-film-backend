const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  transactionSuccess: { type: Boolean, required: true },
  username: { type: String, required: true },
  movieName: { type: String, required: true },
  quantity: { type: Number, required: true },
  seatNo: [{ type: String, required: true }],
});

module.exports = {
  Ticket: mongoose.model("Ticket", TicketSchema),
  TicketSchema,
};
