'use strict';

const errorEmbeds = require('../../utils/errorEmbeds');
const { createEmbed } = require('../../utils/embedCreator');
const { useQueue } = require('discord-player');
const { emoji } = require('../../config/default');

module.exports = {
    name: 'jump',
    aliases: ['j', 'skipto'],
    dj: true,
    cooldown: 2,
    async run(_client, message, args) {
        if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [errorEmbeds.voice_error] });

        const queue = useQueue(message.guild.id);

        if (!queue?.isPlaying()) return message.channel.send({ embeds: [errorEmbeds.queue_error] });

        const index = parseInt(args[0]);
        const track = queue.tracks.at(index - 1);

        if (!index || !track || index < 0) return message.channel.send({ embeds: [errorEmbeds.number_error] });

        queue.node.jump(track);
        message.channel.send({ embeds: [createEmbed({ description: `${emoji.forward} **Skipped to \`${track.cleanTitle}\`**` })] });
    },
};