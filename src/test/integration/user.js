const mongoose = require("mongoose");
const supertest = require("supertest");
const { expect } = require("chai");
const app = require("../../server");
const { connect } = require("../../config/database");
const User = require("../../models/user");

describe("User API test", async () => {
  beforeEach(() => {
    connect();
  });

  afterEach(async () => {
    await User.deleteMany();
    mongoose.connection.close();
  });

  describe("GET /api/v1/users", () => {
    it("should return all users", async () => {
      const expectedUser = new User({
        name: "Jane Doe",
        email: "JaneDoe@example.com",
        phoneNo: "+46764367455",
        ticketDetails: [
          {
            date: "16/11/2020 - måndag",
            time: "9:30",
            quantity: 1,
            username: "Jane Doe",
            movieName: "Welcome",
            transactionSuccess: true,
            seatNo: ["A1"],
          },
        ],
      });
      await expectedUser.save();

      const response = await supertest(app).get("/api/v1/users").expect(200);

      expect(response.body[0].name).to.equal(expectedUser.name);
      expect(response.body[0].email).to.equal(expectedUser.email);
      expect(response.body[0].phoneNo).to.equal(expectedUser.phoneNo);
      expect(response.body[0].ticketDetails[0].date).to.equal(
        expectedUser.ticketDetails[0].date
      );
      expect(response.body[0].ticketDetails[0].time).to.equal(
        expectedUser.ticketDetails[0].time
      );
      expect(response.body[0].ticketDetails.date).to.equal(
        expectedUser.ticketDetails.date
      );
      expect(response.body[0].ticketDetails[0].quantity).to.equal(
        expectedUser.ticketDetails[0].quantity
      );
      expect(response.body[0].ticketDetails[0].username).to.equal(
        expectedUser.ticketDetails[0].username
      );
      expect(response.body[0].ticketDetails[0].movieName).to.equal(
        expectedUser.ticketDetails[0].movieName
      );
      expect(response.body[0].ticketDetails[0].transactionSuccess).to.equal(
        expectedUser.ticketDetails[0].transactionSuccess
      );
    });
  });

  describe("POST /api/v1/users", () => {
    it("should save user to the databse", async () => {
      const response = await supertest(app)
        .post("/api/v1/users")
        .send({
          name: "Jane Doe",
          email: "JDoe@example.com",
          phoneNo: "46764367455",
          ticketDetails: [
            {
              date: "16/11/2020 - måndag",
              time: "9:30",
              quantity: 1,
              username: "Jane Doe",
              movieName: "Welcome",
              transactionSuccess: true,
              seatNo: ["A1"],
            },
          ],
        })
        .expect(200);

      const findUser = await User.findOne({ _id: response.body._id });
      const findUserId = findUser._id.toString();
      expect(response.body._id).to.equal(findUserId);
      expect(response.body.name).to.equal(findUser.name);
      expect(response.body.phoneNo).to.equal(findUser.phoneNo);
      expect(response.body.email).to.equal(findUser.email);
      expect(response.body.ticketDetails.date).to.equal(
        findUser.ticketDetails.date
      );
      expect(response.body.ticketDetails.time).to.equal(
        findUser.ticketDetails.time
      );
      expect(response.body.ticketDetails.date).to.equal(
        findUser.ticketDetails.date
      );
      expect(response.body.ticketDetails.quantity).to.equal(
        findUser.ticketDetails.quantity
      );
      expect(response.body.ticketDetails.username).to.equal(
        findUser.ticketDetails.username
      );
      expect(response.body.ticketDetails.movieName).to.equal(
        findUser.ticketDetails.movieName
      );
      expect(response.body.ticketDetails.transactionSuccess).to.equal(
        findUser.ticketDetails.transactionSuccess
      );
      expect(response.body.ticketDetails.seatNo).to.equal(
        findUser.ticketDetails.seatNo
      );
    });
  });
});
