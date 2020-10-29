const mongoose = require("mongoose");
const { TicketSchema } = require("./ticket");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: String,
  email: { type: String, required: true },
  phoneNo: { type: String, required: true },
  tickets: [TicketSchema],
});

module.exports = mongoose.model("User", UserSchema);
