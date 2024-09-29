'use strict';

const errorEmbeds = require('../../utils/errorEmbeds');
const { otherPlayerOptions, emoji, } = require('../../config/default');
const { createEmbed } = require('../../utils/embedCreator');
const { useQueue } = require('discord-player');

module.exports = {
    name: 'bassboostlow',
    aliases: ['bbl'],
    dj: true,
    cooldown: 2,
    async execute(_client, message) {
        if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [errorEmbeds.voice_error] });

        const queue = useQueue(message.guild.id);

        if (!queue?.isPlaying()) return message.channel.send({ embeds: [errorEmbeds.empty_queue_error] });

        if (queue.filters.ffmpeg.getFiltersEnabled().length >= otherPlayerOptions.maxFiltersEnabled && queue.filters.ffmpeg.isDisabled('bassboost_low')) return message.channel.send({ embeds: [errorEmbeds.max_filters_enabled_error] });

        const mode = queue.filters.ffmpeg.isEnabled('bassboost_low') ? 'disabled' : 'enabled';

        await queue.filters.ffmpeg.toggle(['bassboost_low', 'normalizer']);
        message.channel.send({ embeds: [createEmbed({ description: `${emoji.checkmark} **Low Bassboost has been \`${mode}\`**` })] });
    },
};