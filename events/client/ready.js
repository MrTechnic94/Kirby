'use strict';

const logger = require('../../utils/consoleLogger');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		// Displaying bot login information
		logger.info(`Logged in as ${client.user.tag}`);

		// Checking if the bot is in developer mode
		if (global.isDev) {
			logger.info('Running in Dev Mode');
		}
	},
};