'use strict';

const errorEmbeds = require('../../utils/errorEmbeds');
const { createEmbed } = require('../../utils/embedCreator');
const { useQueue } = require('discord-player');
const { embedOptions, emoji } = require('../../config/default');

module.exports = {
    name: 'loop',
    aliases: ['repeat'],
    dj: true,
    cooldown: 2,
    async execute(_client, message, args) {
        if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [errorEmbeds.voice_error] });

        const queue = useQueue(message.guild.id);

        if (!queue?.isPlaying()) return message.channel.send({ embeds: [errorEmbeds.empty_queue_error] });

        const modes = {
            off: 0,
            track: 1,
            playlist: 2
        };

        let requestedMode = args[0];

        if (requestedMode && modes[requestedMode] !== undefined) {
            if (modes[requestedMode] === queue.repeatMode) return message.channel.send({ embeds: [createEmbed({ description: `### ${emoji.crossmark} Something went wrong!\nMode **${requestedMode}** is already set`, color: embedOptions.errorColor })] });

            queue.setRepeatMode(modes[requestedMode]);
        } else {
            queue.setRepeatMode(queue.repeatMode === 0 ? 1 : (queue.repeatMode === 1 ? 2 : 0));
            requestedMode = 'toggle';
        }

        const modeName = queue.repeatMode === 1 ? 'Track' : 'Playlisty';

        const modeOff = queue.repeatMode === 0 ? 'disabled' : 'enabled';

        const modeEmoji = queue.repeatMode === 2 ? emoji.repeatone : emoji.repeat;

        message.channel.send({ embeds: [createEmbed({ description: `${modeEmoji} **\`${modeName}\` loop has been \`${modeOff}\`**` })] });
    },
};