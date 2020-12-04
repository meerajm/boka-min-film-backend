/* eslint-disable no-console */

process.env.DEBUG = 'mongo-seeding';
const { Seeder } = require('mongo-seeding');
const path = require('path');

const envFiles = {
  development: '.env',
  test: '.env.test',
};

// eslint-disable-next-line import/no-unresolved
require('dotenv').config({ path: envFiles[process.env.NODE_ENV] });

const config = {
  database: process.env.MONGODB_URI,
  dropDatabase: false,
  dropCollections: true,
};

const seeder = new Seeder(config);
const collections = seeder.readCollectionsFromPath(
  path.resolve('./seed-db/data')
);

// eslint-disable-next-line no-return-await
(async () => {
  try {
    await seeder.import(collections);
    console.log('movies and cinema details were successfully imported');
  } catch (e) {
    console.log(e);
  }
})();
