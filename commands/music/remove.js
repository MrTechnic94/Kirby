'use strict';

const errorEmbeds = require('../../utils/errorEmbeds');
const { createEmbed } = require('../../utils/embedCreator');
const { useQueue } = require('discord-player');
const { emoji } = require('../../config/default');

module.exports = {
    name: 'remove',
    aliases: ['rm', 'delete', 'del'],
    dj: true,
    cooldown: 2,
    async execute(_client, message, args) {
        if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [errorEmbeds.voice_error] });

        const queue = useQueue();

        if (!queue?.isPlaying()) return message.channel.send({ embeds: [errorEmbeds.empty_queue_error] });

        const index = parseInt(args[0]);
        const track = queue.tracks.at(index - 1);

        if (!index || !track || index < 0) return message.channel.send({ embeds: [errorEmbeds.number_error] });

        queue.removeTrack(track);
        message.channel.send({ embeds: [createEmbed({ description: `${emoji.dart} **Removed \`${track.cleanTitle}\`**` })] });
    },
};