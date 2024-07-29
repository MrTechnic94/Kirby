'use strict';

const Redis = require('ioredis');
const logger = require('./consoleLogger');

// Creating a Redis client
const redis = new Redis({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD
});

// Handling connection and database error events
redis.once('connect', () => {
    logger.info('Connected to database');
});

redis.once('error', (err) => {
    logger.error(`Error connecting to database\n${err}`);
    process.exit(1);
});

module.exports = redis;