'use strict';

module.exports = {
	name: 'playerFinish',
	async execute(_client, queue) {
		if (queue.npmessage?.editable) await queue.npmessage.delete().catch(() => null);
	},
};