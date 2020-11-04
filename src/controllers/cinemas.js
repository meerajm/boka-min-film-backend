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

//get all cinema details matching the movie title
router.get("/:cinema/:movieTitle", async (req, res) => {
  try {
    const movies = await Cinema.findOne({ cinemaName: req.params.cinema });
    let filterCinemas = [];
    if (!movies) {
      res
        .status(404)
        .json({ message: "movie data does not exist for this cinema house" });
    } else {
      filterCinemas = movies.showDetails.filter((data) => {
        return data.movieTitle === req.params.movieTitle;
      });
      if (!filterCinemas) {
        res.status(404).json({ message: "movie does not exist" });
      } else {
        return res.json(filterCinemas);
      }
    }
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
