'use strict';

const logger = require('../../utils/consoleLogger');

module.exports = {
    name: 'error',
    async execute(_client, err) {
        logger.error(`Error connecting to database\n${err}`);
    },
};