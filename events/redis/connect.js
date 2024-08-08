'use strict';

const logger = require('../../utils/consoleLogger');

module.exports = {
    name: 'connect',
    async execute() {
        logger.info('Connected to database');
    },
};