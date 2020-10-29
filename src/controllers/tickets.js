const express = require("express");
const { findById } = require("../models/user");
const User = require("../models/user");

const router = express.Router({ mergeParams: true });

// Find all the tickets of a user
router.get("/", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      res.status(404).json({ message: "user id does not exist" });
    }
    return res.json(user.tickets);
  } catch (err) {
    return res.status(500).send();
  }
});

// Add a ticket to a specific user
router.post("/", async (req, res) => {
  const userData = await User.findById(req.params.userId);
  const fullName = userData.firstName + " " + userData.lastName;
  const { body } = req;
  try {
    if (
      body.timeDate &&
      body.transactionSuccess &&
      body.quantity &&
      body.seatNo
    ) {
      await User.updateOne(
        { _id: req.params.userId },
        {
          $push: {
            tickets: {
              timeDate: body.timeDate,
              name: fullName,
              transactionSuccess: body.transactionSuccess,
              quantity: body.quantity,
              seatNo: body.seatNo,
            },
          },
        }
      );
      return res.json(body);
    }
    return res.status(400).json({
      message: "Missing data",
    });
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
