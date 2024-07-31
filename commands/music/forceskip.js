'use strict';

const errorEmbeds = require('../../utils/errorEmbeds');
const { useQueue, QueueRepeatMode } = require('discord-player');
const { createEmbed } = require('../../utils/embedCreator');
const { emoji } = require('../../config/default');

module.exports = {
    name: 'forceskip',
    aliases: ['fs'],
    dj: true,
    cooldown: 2,
    async run(_client, message) {
        if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [errorEmbeds.voice_error] });

        const queue = useQueue(message.guild.id);

        if (!queue?.isPlaying() || queue.repeatMode === QueueRepeatMode.OFF && !queue.tracks.at(0)) return message.channel.send({ embeds: [errorEmbeds.queue_error] });

        queue.node.skip();
        message.channel.send({ embeds: [createEmbed({ description: `${emoji.nextsong} **Skipped current song**` })] });
    },
};