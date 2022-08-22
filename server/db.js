const knex = require("knex");
const redis = require("redis");

const db = knex({
  client: "pg",
  connection: process.env.DATABASE_URL,
});

const redisDb = redis.createClient({
  socket: {
    host: "localhost",
    port: "6379",
  },
});

redisDb.connect();

module.exports = {
  db: db,
  redis: redisDb,
};
