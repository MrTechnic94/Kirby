'use strict';

const errorEmbeds = require('../../utils/errorEmbeds');
const { clientPlayerOptions, emoji, } = require('../../config/default');
const { createEmbed } = require('../../utils/embedCreator');
const { useQueue } = require('discord-player');

module.exports = {
    name: 'nightcore',
    aliases: ['nc'],
    dj: true,
    cooldown: 2,
    async execute(_client, message) {
        if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [errorEmbeds.voice_error] });

        const queue = useQueue();

        if (!queue?.isPlaying()) return message.channel.send({ embeds: [errorEmbeds.empty_queue_error] });

        if (queue.filters.ffmpeg.getFiltersEnabled().length >= clientPlayerOptions.maxFiltersEnabled && queue.filters.ffmpeg.isDisabled('nightcore')) return message.channel.send({ embeds: [errorEmbeds.max_filters_enabled_error] });

        const mode = queue.filters.ffmpeg.isEnabled('nightcore') ? 'disabled' : 'enabled';

        await queue.filters.ffmpeg.toggle(['nightcore', 'normalizer']);
        message.channel.send({ embeds: [createEmbed({ description: `${emoji.checkmark} **Nightcore has been \`${mode}\`**` })] });
    },
};