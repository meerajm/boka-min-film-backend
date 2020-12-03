const express = require("express");
const cors = require("cors");
const multer = require("multer");
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

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

app.use(multerMid.single("file"));

const users = require("./controllers/users");
const movies = require("./controllers/movies");
const cinemas = require("./controllers/cinemas");
const payment = require("./controllers/payments");

app.get("/", (req, res) => {
  logger.debug("hi there");
  res.json({
    message: "it works",
  });
});

app.use("/api/v1/users", users);
app.use("/api/v1/movies", movies);
app.use("/api/v1/cinemas", cinemas);
app.use("/checkout", payment);

module.exports = app;
