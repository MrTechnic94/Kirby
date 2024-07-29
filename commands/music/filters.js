'use strict';

const redis = require('../../utils/redis');
const errorEmbeds = require('../../utils/errorEmbeds');
const { createEmbed } = require('../../utils/embedCreator');
const { useQueue } = require('discord-player');
const { emoji } = require('../../config/default');

module.exports = {
    name: 'filters',
    aliases: ['f'],
    dj: true,
    cooldown: 2,
    async run(_client, message, args) {
        const queue = useQueue(message.guild.id);

        if (!queue?.isPlaying()) return message.channel.send({ embeds: [errorEmbeds.queue_error] });

        switch (args[0]) {
            case 'clear':
                if (!queue.filters.ffmpeg.isEnabled('normalizer')) return message.channel.send({ embeds: [errorEmbeds.filters_error] });
                await queue.filters.ffmpeg.setFilters(false);
                // return message.channel.send({ embeds: [errorEmbeds.disabled_filters_success] });
                return message.channel.send({ embeds: [createEmbed({ description: `### ${emoji.checkmark} Success!\nAll filters have been disabled` })] });
        }

        const filters = [
            { name: 'bassboost_low', label: 'BassBoost Low' },
            { name: 'bassboost', label: 'BassBoost' },
            { name: 'bassboost_high', label: 'BassBoost High' },
            { name: 'karaoke', label: 'Karaoke' },
            { name: 'nightcore', label: 'Nightcore' },
            { name: 'vaporwave', label: 'Vaporwave' }
        ];

        const embedFields = filters.map(filter => {
            const isEnabled = queue.filters.ffmpeg.isEnabled(filter.name);
            const status = isEnabled ? emoji.greencircle : emoji.redcircle;
            return `${status} **${filter.label}**`;
        });

        const guildData = await redis.hgetall(message.guild.id);

        const prefix = guildData?.prefix ?? process.env.PREFIX;

        message.channel.send({
            embeds: [
                createEmbed({
                    // title: '📰 Lista filtrów',
                    description: `### ${emoji.info} Filters list\n${embedFields.join('\n')}`,
                    footer: {
                        text: `Example usage: ${prefix}bassboost`
                    },
                }),
            ],
        });
    },
};