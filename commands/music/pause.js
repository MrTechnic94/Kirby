'use strict';

const errorEmbeds = require('../../utils/errorEmbeds');
const { createEmbed } = require('../../utils/embedCreator');
const { useQueue } = require('discord-player');
const { emoji } = require('../../config/default');

module.exports = {
    name: 'pause',
    dj: true,
    cooldown: 2,
    async execute(_client, message) {
        if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [errorEmbeds.voice_error] });

        const queue = useQueue(message.guild.id);

        if (!queue?.isPlaying()) return message.channel.send({ embeds: [errorEmbeds.empty_queue_error] });

        if (queue.node.isPaused()) return message.channel.send({ embeds: [errorEmbeds.paused_error] });

        if (queue.node.volume === 0) return message.channel.send({ embeds: [errorEmbeds.muted_player_error] });

        queue.node.pause();
        message.channel.send({ embeds: [createEmbed({ description: `${emoji.forward} **Song playback was \`paused\`**` })] });
    },
};