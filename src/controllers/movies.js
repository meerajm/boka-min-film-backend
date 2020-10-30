const express = require("express");
const Movie = require("../models/movie");

const router = express.Router();

// get all users
router.get("/", async (req, res) => {
  const allMovies = await Movie.find();
  return res.json(allMovies);
});

module.exports = router;
