'use strict';

const logger = require('../../utils/consoleLogger');
const errorEmbeds = require('../../utils/errorEmbeds');
const { otherPlayerOptions, emoji } = require('../../config/default');
const { createEmbed } = require('../../utils/embedCreator');
const { useMainPlayer } = require('discord-player');

module.exports = {
    name: 'play',
    aliases: ['p', 'songrequest', 'sr'],
    dj: true,
    cooldown: 2,
    async execute(_client, message, args) {
        if (!args.length) return message.channel.send({ embeds: [errorEmbeds.track_error] });

        if (!message.member?.voice.channelId) return message.channel.send({ embeds: [errorEmbeds.member_voice_error] });

        if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [errorEmbeds.voice_error] });

        if (message.member?.voice.channel.full && !message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [errorEmbeds.full_channel_error] });

        if (message.guild.members.me?.voice.serverMute) return message.channel.send({ embeds: [errorEmbeds.muted_bot_error] });

        const player = useMainPlayer();

        const result = await player.search(args.join(' '), {
            requestedBy: message.member,
            fallbackSearchEngine: 'spotifySearch'
        });

        if (!result.hasTracks()) return message.channel.send({ embeds: [errorEmbeds.track_error] });

        try {
            message.channel.send({ embeds: [createEmbed({ description: result.hasPlaylist() ? `${emoji.checkmark} **Added \`${result.tracks.length}\` tracks from \`${result.playlist.title}\`**` : `${emoji.checkmark} **Added \`${result.tracks[0].cleanTitle}\` to playlist**` })] });
            await player.play(message.member.voice.channel, result, {
                nodeOptions: {
                    metadata: message.channel,
                    ...otherPlayerOptions
                }
            });
        } catch (err) {
            logger.error(err);
            message.channel.send({ embeds: [errorEmbeds.catch_error] });
        }
    },
};