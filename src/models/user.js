const mongoose = require("mongoose");
const { TicketSchema } = require("./ticket");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNo: { type: String, required: true },
  ticketDetails: [TicketSchema],
});

module.exports = mongoose.model("User", UserSchema);
