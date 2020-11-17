const mongoose = require("mongoose");
const supertest = require("supertest");
const { expect } = require("chai");
const app = require("../../server");
const { connect } = require("../../config/database");
const Movie = require("../../models/movie");

describe("Movie API test", async () => {
  beforeEach(() => {
    connect();
  });

  afterEach(async () => {
    await Movie.deleteMany();
    mongoose.connection.close();
  });

  describe("GET /api/v1/movies", () => {
    it("should return all movies", async () => {
      const expectedMovie = new Movie({
        title: "Avengers: Infinity War",
        poster:
          "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg",
        language: "English",
        genre: "Action",
        description:
          "The Avengers must stop Thanos, an intergalactic warlord, from getting his hands on all the infinity stones. However, Thanos is prepared to go to any lengths to carry out his insane plan.",
        trailer: "https://www.youtube.com/embed/03-KVRmd3xo",
      });
      await expectedMovie.save();

      const response = await supertest(app).get("/api/v1/movies").expect(200);

      expect(response.body[0].title).to.equal(expectedMovie.title);
      expect(response.body[0].poster).to.equal(expectedMovie.poster);
      expect(response.body[0].language).to.equal(expectedMovie.language);
      expect(response.body[0].genre).to.equal(expectedMovie.genre);
      expect(response.body[0].description).to.equal(expectedMovie.description);
      expect(response.body[0].trailer).to.equal(expectedMovie.trailer);
    });
  });
});
