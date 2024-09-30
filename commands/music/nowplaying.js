'use strict';

const errorEmbeds = require('../../utils/errorEmbeds');
const { createEmbed } = require('../../utils/embedCreator');
const { useQueue } = require('discord-player');
const { emoji } = require('../../config/default');

module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
    cooldown: 2,
    async execute(_client, message) {
        const queue = useQueue(message.guild.id);

        if (!queue?.isPlaying()) return message.channel.send({ embeds: [errorEmbeds.empty_queue_error] });

        const progressbar = queue.node.createProgressBar({ timecodes: false, length: 13, leftChar: '[▬](https://top.gg/bot/1210159317119008819)' });
        const status = queue.node.isPaused() ? '▶️' : '⏸️';
        const requester = queue.currentTrack.requestedBy ?? '**`unknown`**';
        const author = queue.currentTrack.author ?? 'unknown';
        const duration = queue.currentTrack.raw.live ? `**Progress bar is not visible because it is a \`${emoji.normalredcircle} Live\`**` : `\n${status} | ${progressbar} ${queue.node.getTimestamp().current.label} / ${queue.currentTrack.duration}`;

        message.channel.send({
            embeds: [
                createEmbed({
                    description: `### ${emoji.zap} Now playing\n**Title: [${queue.currentTrack.cleanTitle}](${queue.currentTrack.url})**\n**Author: \`${author}\`**\n**Volume: \`${queue.node.volume}%\`**\n**Requested by:** ${requester}\n${duration}`,
                    thumbnail: queue.currentTrack.thumbnail
                }),
            ],
        });
    },
};