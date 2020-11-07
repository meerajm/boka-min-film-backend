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

//Update booked seats
router.patch("/:cinemaId/:showId", async (req, res) => {
  const { body } = req;
  try {
    const cinema = await Cinema.findById(req.params.cinemaId);
    if (!cinema) {
      return res.status(404).json({ message: "cinema id does not exist" });
    } else {
      const showDetail = await cinema.showDetails.find((show) => {
        return show.id === +req.params.showId;
      });
      if (!showDetail) {
        return res
          .status(404)
          .json({ message: "show details does not exist for the id" });
      } else {
        const result = body.seatNo.concat(showDetail.bookedSeats);
        await Cinema.updateOne(
          { _id: req.params.cinemaId, "showDetails.id": req.params.showId },
          { $set: { "showDetails.$.bookedSeats": result, }, }
        );
        return res.json({message: "Successfully updated"});
      }
    }
  } catch (err) {
    res.status(500).send();
  }
});

//get cinema with show details
router.get("/all", async (req, res) => {
  try {
    const cinemaNames = await Cinema.find({}, { _id: 1, cinemaName: 1 });
    if (!cinemaNames) {
      res.status(404).json({ message: "no data found" });
    } else {
      return res.json(cinemaNames);
    }
  } catch (err) {
    res.status(500).send();
  }
});

//get all cinema details matching the movie title
router.get("/:cinema/:movieTitle/:day", async (req, res) => {
  try {
    const movies = await Cinema.findOne({ cinemaName: req.params.cinema });
    let filterCinemas = [];
    if (!movies) {
      res
        .status(404)
        .json({ message: "movie data does not exist for this cinema house" });
    } else {
      filterCinemas = movies.showDetails.filter((data) => {
        return (
          data.movieTitle === req.params.movieTitle &&
          data.showDay === req.params.day
        );
      });
      if (!filterCinemas) {
        res.status(404).json({ message: "movie does not exist" });
      } else {
        return res.json(filterCinemas);
      }
    }
  } catch (err) {
    return res.status(500).send();
  }
});

module.exports = router;
