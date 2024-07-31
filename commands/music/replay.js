'use strict';

const errorEmbeds = require('../../utils/errorEmbeds');
const { createEmbed } = require('../../utils/embedCreator');
const { useQueue, useMainPlayer } = require('discord-player');
const { emoji } = require('../../config/default');

module.exports = {
    name: 'replay',
    aliases: ['duplicate'],
    dj: true,
    cooldown: 2,
    async run(_client, message) {
        if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [errorEmbeds.voice_error] });

        if (message.guild.members.me?.voice.mute) return message.channel.send({ embeds: [errorEmbeds.muted_bot_error] });

        const queue = useQueue(message.guild.id);

        if (!queue?.isPlaying()) return message.channel.send({ embeds: [errorEmbeds.queue_error] });

        const player = useMainPlayer();

        const result = await player.search(queue.currentTrack.url, {
            requestedBy: message.member
        });

        if (!result.hasTracks()) return message.channel.send({ embeds: [errorEmbeds.track_error] });

        queue.insertTrack(result.tracks[0], 0);
        message.channel.send({ embeds: [createEmbed({ description: `${emoji.checkmark} **Added \`${result.tracks[0].cleanTitle}\` to playlist**` })] });
    },
};