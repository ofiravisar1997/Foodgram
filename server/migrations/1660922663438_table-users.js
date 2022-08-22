/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE TABLE users(
        id BIGSERIAL PRIMARY KEY,
        userId uuid DEFAULT uuid_generate_v4 (),
        email VARCHAR(50) NOT NULL,
        password VARCHAR(100) NOT NULL,
        name VARCHAR(100) NOT NULL,
        UNIQUE (email)
    );
    `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE users;`);
};
