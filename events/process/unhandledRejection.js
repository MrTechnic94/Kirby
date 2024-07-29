'use strict';

const logger = require('../../utils/consoleLogger');

module.exports = {
	name: 'unhandledRejection',
	async run(_client, reason) {
		logger.error(reason);
	},
};