const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DEVELOPMENT_NAME,
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT || 'postgres'
  },
  test: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_TEST_NAME,
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT || 'postgres'
  },
  production: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_PRODUCTION_NAME,
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT || 'postgres'
  }
};
