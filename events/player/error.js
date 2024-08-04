'use strict';

const logger = require('../../utils/consoleLogger');
const errorEmbeds = require('../../utils/errorEmbeds');

module.exports = {
	name: 'error',
	async execute(_client, queue, err) {
		logger.error(err);
		queue.metadata.send({ embeds: [errorEmbeds.catch_error] });
	},
};