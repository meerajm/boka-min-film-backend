const express = require("express");
const User = require("../models/user");

const router = express.Router();

// get all users
router.get("/", async (req, res) => {
  const allUsers = await User.find();
  return res.json(allUsers);
});

// post user info
router.post("/", async (req, res) => {
  const { name, email, phoneNo, ticketDetails } = req.body;
  try {
    if (name && email && phoneNo && ticketDetails) {
      const user = new User({
        name,
        email,
        phoneNo,
        ticketDetails,
      });
      await user.save();
      return res.json(user);
    }
    return res.status(400).json({
      message: "please include name, email, phone number and ticket details",
    });
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
