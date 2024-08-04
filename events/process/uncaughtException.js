'use strict';

const logger = require('../../utils/consoleLogger');

module.exports = {
	name: 'uncaughtException',
	async execute(_client, err) {
		logger.error(err);
	},
};