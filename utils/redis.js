'use strict';

const Redis = require('ioredis');

// Creating a Redis client
const redis = new Redis({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    connectTimeout: Number(process.env.DB_CONNECT_TIMEOUT)
});

module.exports = redis;