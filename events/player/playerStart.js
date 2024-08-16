'use strict';

const { emoji } = require('../../config/default');
const { createEmbed } = require('../../utils/embedCreator');

module.exports = {
	name: 'playerStart',
	async execute(_client, queue, track) {
		const requester = track.requestedBy ?? '**`unknown`**';

		queue.npmessage = await queue.metadata.send({
			embeds: [
				createEmbed({
					description: `### ${emoji.kirbyflying} Now playing\n**[${track.cleanTitle}](${track.url})**`,
					fields: [
						{ name: '**Requested by**', value: `${requester}`, inline: true },
						{ name: '**Duration**', value: `**\`${track.duration}\`**`, inline: true }
					],
					thumbnail: track.thumbnail
				}),
			],
		});
	},
};