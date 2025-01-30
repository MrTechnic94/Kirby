'use strict';

const errorEmbeds = require('../../utils/errorEmbeds');
const { createEmbed } = require('../../utils/embedCreator');
const { useQueue } = require('discord-player');
const { emoji } = require('../../config/default');

module.exports = {
    name: 'volume',
    aliases: ['v', 'vol'],
    dj: true,
    cooldown: 2,
    async execute(_client, message, args) {
        if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [errorEmbeds.voice_error] });

        const queue = useQueue();

        if (!queue?.isPlaying()) return message.channel.send({ embeds: [errorEmbeds.empty_queue_error] });

        const vol = parseInt(args[0]);

        const currentVolumeEmoji = queue.node.volume === 0 ? emoji.mute : queue.node.volume >= 51 ? emoji.loudsound : emoji.sound;

        if (isNaN(vol)) return message.channel.send({ embeds: [createEmbed({ description: `${currentVolumeEmoji} **Current volume: \`${queue.node.volume}%\`**` })] });

        if (vol < 0 || vol > 200) return message.channel.send({ embeds: [errorEmbeds.max_volume_error] });

        if (queue.node.volume === vol) return message.channel.send({ embeds: [errorEmbeds.already_volume_error] });

        queue.node.setVolume(vol);

        vol === 0 ? queue.node.pause() : queue.node.resume();

        const volumeEmoji = vol === 0 ? emoji.mute : vol >= 51 ? emoji.loudsound : emoji.sound;

        message.channel.send({ embeds: [createEmbed({ description: `${volumeEmoji} **Volume set to \`${vol}%\`**` })] });
    },
};