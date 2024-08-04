'use strict';

const logger = require('../../utils/consoleLogger');

module.exports = {
	name: 'unhandledRejection',
	async execute(_client, reason) {
		logger.error(reason);
	},
};