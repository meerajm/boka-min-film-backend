const mongoose = require("mongoose");
const supertest = require("supertest");
const { expect } = require("chai");
const app = require("../../server");
const { connect } = require("../../config/database");
const Cinema = require("../../models/cinema");
const showDetails = require("../../models/showDetails");

describe("Cinema API test", async () => {
  beforeEach(() => {
    connect();
  });

  afterEach(async () => {
    await Cinema.deleteMany();
    mongoose.connection.close();
  });

  describe("GET /api/v1/cinemas", () => {
    it("should return all cinemas", async () => {
      const expectedCinema = new Cinema({
        cinemaName: "INOX",
        showDetails: [
          {
            id: 1,
            showDay: "söndag",
            startTime: "9:30",
            movieTitle: "Welcome",
            screen: "1",
            bookedSeats: ["A1", "A2", "B1"],
          },
        ],
      });
      await expectedCinema.save();

      const response = await supertest(app).get("/api/v1/cinemas").expect(200);
      expect(response.body[0].cinemaName).to.equal(expectedCinema.cinemaName);
      expect(response.body[0].showDetails[0].id).to.equal(
        expectedCinema.showDetails[0].id
      );
      expect(response.body[0].showDetails[0].showDay).to.equal(
        expectedCinema.showDetails[0].showDay
      );
      expect(response.body[0].showDetails[0].startTime).to.equal(
        expectedCinema.showDetails[0].startTime
      );
      expect(response.body[0].showDetails[0].movieTitle).to.equal(
        expectedCinema.showDetails[0].movieTitle
      );
      expect(response.body[0].showDetails[0].screen).to.equal(
        expectedCinema.showDetails[0].screen
      );
      expect(
        JSON.stringify(response.body[0].showDetails[0].bookedSeats)
      ).to.equal(JSON.stringify(expectedCinema.showDetails[0].bookedSeats));
    });
  });

  describe("GET /api/v1/cinemas/all", () => {
    it("should return all cinemas", async () => {
      const expectedCinema = new Cinema({
        cinemaName: "INOX",
        showDetails: [
          {
            id: 1,
            showDay: "söndag",
            startTime: "9:30",
            movieTitle: "Welcome",
            screen: "1",
            bookedSeats: ["A1", "A2", "B1"],
          },
        ],
      });
      await expectedCinema.save();

      const response = await supertest(app)
        .get("/api/v1/cinemas/all")
        .expect(200);

      const cinemaNames = await Cinema.find({}, { _id: 1, cinemaName: 1 });
      console.log(cinemaNames[0]._id)
      expect(response.body[0].cinemaName).to.equal(cinemaNames[0].cinemaName);
      expect(response.body[0]._id).to.equal(cinemaNames[0]._id.toString());
      expect(response.body[0]).to.not.include(expectedCinema.showDetails);
    });
  });

  describe("PATCH /api/v1/cinemas/:cinemaName/:showId", () => {
    it("should update a cinema's booked seat", async () => {
      const expectedCinema = new Cinema({
        cinemaName: "INOX",
        showDetails: [
          {
            id: 1,
            showDay: "söndag",
            startTime: "9:30",
            movieTitle: "Welcome",
            screen: "1",
            bookedSeats: ["A1", "A2", "B1"],
          },
        ],
      });
      await expectedCinema.save();

      await supertest(app)
        .patch(
          `/api/v1/cinemas/${expectedCinema.cinemaName}/${expectedCinema.showDetails[0].id}`
        )
        .send({
          seatNo: ["E2"],
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      const findUpdatedCinema = await Cinema.findOne({
        cinemaName: expectedCinema.cinemaName,
      });
      expect(
        JSON.stringify(findUpdatedCinema.showDetails[0].bookedSeats)
      ).to.equal(JSON.stringify(["E2", "A1", "A2", "B1"]));
    });
  });

  describe("POST /api/v1/cinemas", () => {
    it("should save cinema details to the databse", async () => {
      const response = await supertest(app)
        .post("/api/v1/cinemas")
        .send({
          cinemaName: "INOX",
          showDetails: [
            {
              id: 1,
              showDay: "söndag",
              startTime: "9:30",
              movieTitle: "Welcome",
              screen: "1",
              bookedSeats: ["A1", "A2", "B1"],
            },
          ],
        })
        .expect(200);

      const findCinema = await Cinema.findOne({ _id: response.body._id });
      const findCinemaId = findCinema._id.toString();

      expect(response.body._id).to.equal(findCinemaId);
      expect(response.body.cinemaName).to.equal(findCinema.cinemaName);
      expect(JSON.stringify(response.body.showDetails[0])).to.equal(
        JSON.stringify(findCinema.showDetails[0])
      );
    });
  });
});
