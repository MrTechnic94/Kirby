'use strict';

const { createEmbed } = require('../../utils/embedCreator');
const { emoji } = require('../../config/default');

module.exports = {
	name: 'playerStart',
	async execute(_client, queue, track) {
		const requester = track.requestedBy ?? '**`unknown`**';
		const duration = track.raw.live ? `**\`${emoji.regredcircle} Live\`**` : `**\`${track.duration}\`**`;

		queue.npmessage = await queue.metadata.send({
			embeds: [
				createEmbed({
					description: `### ${emoji.kirbyflying} Now playing\n**[${track.cleanTitle}](${track.url})**`,
					fields: [
						{ name: '**Requested by**', value: `${requester}`, inline: true },
						{ name: '**Duration**', value: duration, inline: true }
					],
					thumbnail: track.thumbnail
				}),
			],
		});
	},
};