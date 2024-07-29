'use strict';

const errorEmbeds = require('../../utils/errorEmbeds');
const { createEmbed } = require('../../utils/embedCreator');
const { useQueue, QueueRepeatMode } = require('discord-player');
const { embedOptions, emoji } = require('../../config/default');

module.exports = {
    name: 'loop',
    aliases: ['repeat'],
    dj: true,
    cooldown: 2,
    async run(_client, message, args) {
        if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [errorEmbeds.voice_error] });

        const queue = useQueue(message.guild.id);

        if (!queue?.isPlaying()) return message.channel.send({ embeds: [errorEmbeds.queue_error] });

        const modes = {
            off: QueueRepeatMode.OFF,
            track: QueueRepeatMode.TRACK,
            playlist: QueueRepeatMode.QUEUE
        };

        let requestedMode = args[0];

        if (requestedMode && modes[requestedMode] !== undefined) {
            if (modes[requestedMode] === queue.repeatMode) return message.channel.send({ embeds: [createEmbed({ description: `### ${emoji.crossmark} Something went wrong!\nMode **${requestedMode}** is already set`, color: embedOptions.errorColor })] });

            queue.setRepeatMode(modes[requestedMode]);
        } else {
            queue.setRepeatMode(queue.repeatMode === QueueRepeatMode.OFF ? QueueRepeatMode.TRACK : (queue.repeatMode === QueueRepeatMode.TRACK ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF));
            requestedMode = 'toggle';
        }

        const modeName = queue.repeatMode === QueueRepeatMode.TRACK ? 'Track' : 'Playlisty';

        const modeOff = queue.repeatMode === QueueRepeatMode.OFF ? 'disabled' : 'enabled';

        const modeEmoji = queue.repeatMode === QueueRepeatMode.QUEUE ? emoji.repeatone : emoji.repeat;

        message.channel.send({ embeds: [createEmbed({ description: `${modeEmoji} **\`${modeName}\` loop has been \`${modeOff}\`**` })] });
    },
};