const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  timeDate: { type: String, required: true },
  transactionSuccess: { type: Boolean, required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  seatNo: [{ type: String, required: true }],
});

module.exports = {
  Ticket: mongoose.model("Ticket", TicketSchema),
  TicketSchema,
};
