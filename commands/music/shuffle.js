'use strict';

const errorEmbeds = require('../../utils/errorEmbeds');
const { createEmbed } = require('../../utils/embedCreator');
const { useQueue } = require('discord-player');
const { emoji } = require('../../config/default');

module.exports = {
    name: 'shuffle',
    dj: true,
    cooldown: 2,
    async execute(_client, message) {
        if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [errorEmbeds.voice_error] });

        const queue = useQueue();

        if (!queue?.isPlaying()) return message.channel.send({ embeds: [errorEmbeds.empty_queue_error] });

        if (queue.tracks.size < 3) return message.channel.send({ embeds: [errorEmbeds.shuffle_error] });

        queue.tracks.shuffle();
        message.channel.send({ embeds: [createEmbed({ description: `${emoji.twistedarrows} **Playlist has been shuffled**` })] });
    },
};