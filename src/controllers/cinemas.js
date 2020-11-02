const express = require("express");
const Cinema = require("../models/cinema");

const router = express.Router();

// get all cinema data
router.get("/", async (req, res) => {
  const allCinemas = await Cinema.find();
  return res.json(allCinemas);
});

// post cinema information
router.post("/", async (req, res) => {
  const { cinemaName, showData } = req.body;
  try {
    if (cinemaName && showData) {
      const cinema = new Cinema({
        cinemaName,
        showData,
      });
      await cinema.save();
      return res.json(cinema);
    }
    return res
      .status(400)
      .json({ message: "please include cinema name and show details" });
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
