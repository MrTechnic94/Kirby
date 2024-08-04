'use strict';

const errorEmbeds = require('../../utils/errorEmbeds');
const { createEmbed } = require('../../utils/embedCreator');
const { useQueue } = require('discord-player');
const { emoji } = require('../../config/default');

module.exports = {
    name: 'back',
    aliases: ['b', 'previous', 'prev'],
    dj: true,
    cooldown: 2,
    async execute(_client, message) {
        if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [errorEmbeds.voice_error] });

        const queue = useQueue(message.guild.id);

        if (!queue.history.previousTrack) return message.channel.send({ embeds: [errorEmbeds.track_back_error] });

        await queue.history.back();
        message.channel.send({ embeds: [createEmbed({ description: `${emoji.rewind} **Playing previous song**` })] });
    },
};