'use strict';

// const emoji = require('../../utils/emoji');
const redis = require('../../utils/redis');
const { emoji } = require('../../config/default');
const { createEmbed } = require('../../utils/embedCreator');

module.exports = {
	name: 'playerStart',
	async run(_client, queue, track) {
		const guildData = await redis.hgetall(queue.guild.id);

		if (guildData?.trackAnnounce === 'false') return;

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