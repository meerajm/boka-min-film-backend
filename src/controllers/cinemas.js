const express = require("express");
const Cinema = require("../models/cinema");

const router = express.Router();

router.get("/", async (req, res) => {
  const allCinemas = await Cinema.find();
  return res.json(allCinemas);
});

router.post("/", async (req, res) => {
  const { cinemaName, showDetails } = req.body;
  try {
    if (cinemaName && showDetails) {
      const cinema = new Cinema({
        cinemaName,
        showDetails,
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

router.patch("/:cinemaName/:showId", async (req, res) => {
  const { body } = req;
  try {
    const cinema = await Cinema.findOne({ cinemaName: req.params.cinemaName });
    if (!cinema) {
      return res.status(404).json({ message: "cinema id does not exist" });
    }
    const showDetail = await cinema.showDetails.find(
      (show) => show.id === +req.params.showId
    );
    if (!showDetail) {
      return res
        .status(404)
        .json({ message: "show details does not exist for the id" });
    }
    const result = body.seatNo.concat(showDetail.bookedSeats);
    await Cinema.updateOne(
      {
        cinemaName: req.params.cinemaName,
        "showDetails.id": req.params.showId,
      },
      { $set: { "showDetails.$.bookedSeats": result } }
    );
    return res.json({ message: "Successfully updated" });
  } catch (err) {
    return res.status(500).send();
  }
});

router.get("/all", async (req, res) => {
  try {
    const cinemaNames = await Cinema.find({}, { _id: 1, cinemaName: 1 });
    if (!cinemaNames) {
      return res.status(404).json({ message: "no data found" });
    }
    return res.json(cinemaNames);
  } catch (err) {
    return res.status(500).send();
  }
});

router.get("/:cinema/:movieTitle/:day", async (req, res) => {
  try {
    const movies = await Cinema.findOne({ cinemaName: req.params.cinema });
    let filterCinemas = [];
    if (!movies) {
      return res
        .status(404)
        .json({ message: "movie data does not exist for this cinema house" });
    }
    filterCinemas = movies.showDetails.filter(
      (data) =>
        data.movieTitle === req.params.movieTitle &&
        data.showDay === req.params.day
    );
    if (!filterCinemas) {
      return res.status(404).json({ message: "movie does not exist" });
    }
    return res.json(filterCinemas);
  } catch (err) {
    return res.status(500).send();
  }
});

module.exports = router;
