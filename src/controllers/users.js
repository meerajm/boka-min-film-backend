const express = require("express");
const User = require("../models/user");

const router = express.Router();

// get all users
router.get("/", async (req, res) => {
  const allUsers = await User.find();
  return res.json(allUsers);
});

// post only user info - without ticket details
router.post("/", async (req, res) => {
  const { firstName, lastName, email, phoneNo } = req.body;
  try {
    if (req.body.tickets) {
      return res.status(400).json({ message: "Do not include tickets now" });
    }
    if (firstName && email && phoneNo) {
      const user = new User({
        firstName,
        lastName,
        email,
        phoneNo,
      });
      await user.save();
      return res.json(user);
    }
    return res
      .status(400)
      .json({ message: "please include firstName, email and phone number" });
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
