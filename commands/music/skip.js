'use strict';

const errorEmbeds = require('../../utils/errorEmbeds');
const { createEmbed } = require('../../utils/embedCreator');
const { useQueue } = require('discord-player');
const { emoji } = require('../../config/default');

module.exports = {
    name: 'skip',
    aliases: ['s', 'vote', 'next', 'n'],
    dj: true,
    cooldown: 2,
    async execute(_client, message) {
        if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [errorEmbeds.voice_error] });

        const queue = useQueue(message.guild.id);

        if (!queue?.isPlaying() || queue.repeatMode === 0 && !queue.tracks.at(0)) return message.channel.send({ embeds: [errorEmbeds.empty_queue_error] });

        queue.votes = queue.votes || [];

        if (queue.votes.includes(message.author.id)) return message.channel.send({ embeds: [errorEmbeds.already_voted_error] });

        const required = Math.ceil((message.member.voice.channel.members.size - 1) / 2);

        const currentVotes = queue.votes.length + 1;

        queue.votes.push(message.author.id);

        if (currentVotes >= required) {
            queue.node.skip();
            queue.votes = [];
            return message.channel.send({ embeds: [createEmbed({ description: `${emoji.nextsong} **Skipped current song**` })] });
        }

        message.channel.send({ embeds: [createEmbed({ description: `### ${emoji.checkmark} Success!\nYou voted to skip this song (${currentVotes} / ${required})**` })] });
    },
};