const mongoose = require("mongoose");
const { ShowTimeSchema } = require("./showTime");

const ShowSchema = new mongoose.Schema({
  showDate: { type: String, required: true },
  time:[ShowTimeSchema]
});

module.exports = {
  Show: mongoose.model("Show", ShowSchema),
  ShowSchema,
};