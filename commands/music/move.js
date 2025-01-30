'use strict';

const errorEmbeds = require('../../utils/errorEmbeds');
const { createEmbed } = require('../../utils/embedCreator');
const { useQueue } = require('discord-player');
const { emoji } = require('../../config/default');

module.exports = {
    name: 'move',
    aliases: ['m', 'insert'],
    dj: true,
    cooldown: 2,
    async execute(_client, message, args) {
        if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [errorEmbeds.voice_error] });

        const queue = useQueue();

        if (!queue?.isPlaying()) return message.channel.send({ embeds: [errorEmbeds.empty_queue_error] });

        const index = parseInt(args[0]);
        const indexTrack = parseInt(args[1]);
        const trackToMove = queue.tracks.at(index - 1);

        if (!index || !indexTrack || !trackToMove || index < 0 || indexTrack < 0 || index > queue.tracks.size || indexTrack > queue.tracks.size) return message.channel.send({ embeds: [errorEmbeds.number_error] });

        if (index === indexTrack) return message.channel.send({ embeds: [errorEmbeds.same_move_error] });

        queue.node.move(trackToMove, indexTrack - 1);
        message.channel.send({ embeds: [createEmbed({ description: `${emoji.forward} **Song has been moved from position \`${index}\` to \`${indexTrack}\`**` })] });
    },
};