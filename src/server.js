const express = require("express");
const cors = require("cors");
const pino = require("pino");
const expressLogger = require("express-pino-logger");

const app = express();

const logger = pino({ level: process.env.LOG_LEVEL || "info" });
global.logger = logger;

if (["development", "production"].includes(process.env.NODE_ENV)) {
  app.use(expressLogger({ logger }));
}

app.use(express.json({ limit: "50mb" }));
app.use(cors());

const users = require("./controllers/users");
const tickets = require("./controllers/tickets");
const movies = require("./controllers/movies");
const cinemas = require("./controllers/cinemas");

app.get("/", (req, res) => {
  logger.debug("hi there");
  res.json({
    message: "it works",
  });
});

app.use("/api/v1/users", users);
app.use("/api/v1/users/:userId/tickets", tickets);
app.use("/api/v1/movies", movies);
app.use("/api/v1/cinemas", cinemas);

module.exports = app;
