'use strict';

const errorEmbeds = require('../../utils/errorEmbeds');

module.exports = {
	name: 'emptyQueue',
	async execute(_client, queue) {
		queue.metadata.send({ embeds: [errorEmbeds.empty_queue_error] });
	},
};