const mongoose = require("mongoose");

// eslint-disable-next-line import/no-unresolved

const envFiles = {
  development: ".env",
  production: ".env",
  test: ".env.test",
};

// eslint-disable-next-line import/no-unresolved
require("dotenv").config({ path: envFiles[process.env.NODE_ENV] });

const connect = async () => {
  const mongoConnectionString = process.env.MONGODB_URI;
  try {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    };
    await mongoose.connect(mongoConnectionString, opts);
    logger.debug({ mongoConnectionString });
  } catch (err) {
    logger.error(`Fail to connect with database ${mongoConnectionString}`);
  }
};
module.exports = { connect };
