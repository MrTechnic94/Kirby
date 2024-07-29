'use strict';

const errorEmbeds = require('../../utils/errorEmbeds');
const { createEmbed } = require('../../utils/embedCreator');
const { useQueue } = require('discord-player');
const { emoji } = require('../../config/default');

module.exports = {
    name: 'leave',
    aliases: ['l', 'disconnect', 'dc', 'stop'],
    dj: true,
    cooldown: 2,
    async run(_client, message) {
        if (!message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [errorEmbeds.bot_voice_error] });

        if (!message.member?.voice.channelId) return message.channel.send({ embeds: [errorEmbeds.member_voice_error] });

        if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [errorEmbeds.voice_error] });

        const queue = useQueue(message.guild.id);

        if (queue) {
            queue.delete();
        } else {
            message.guild.members.me?.voice.disconnect();
        }

        message.channel.send({ embeds: [createEmbed({ description: `${emoji.crystalball} **I'm leaving from** <#${message.member?.voice.channelId}>` })] });
    },
};