const express = require("express");
const Movie = require("../models/movie");
const { cloudinary, cloudinaryPreset } = require("../config/cloudinary");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allMovies = await Movie.find();
    return res.json(allMovies);
  } catch (err) {
    return err;
  }
});

router.post("/", async (req, res) => {
  const { body } = req;
  const { title, language, genre, description, trailer, file } = body;
  try {
    if (!file) {
      return res.status(400).send("Poster upload has failed");
    }
    if (title && language && genre && description && trailer && file) {
      const uploadResponse = await cloudinary.uploader.upload(file, {
        upload_preset: cloudinaryPreset[process.env.NODE_ENV],
      });
      const poster = uploadResponse.secure_url;
      const movie = new Movie({
        title,
        poster,
        language,
        genre,
        description,
        trailer,
      });
      await movie.save();
      return res.json(movie);
    }
    return res.status(400).json({
      message: "please include all details",
    });
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
