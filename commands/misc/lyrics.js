'use strict';

const errorEmbeds = require('../../utils/errorEmbeds');
const { createEmbed } = require('../../utils/embedCreator');
const { useQueue, useMainPlayer } = require('discord-player');
const { emoji } = require('../../config/default');

module.exports = {
    name: 'lyrics',
    cooldown: 2,
    async execute(_client, message, args) {
        const queue = useQueue();
        const player = useMainPlayer();

        const searchQuery = args.join(' ') || (queue?.isPlaying() && queue.currentTrack.cleanTitle);

        if (!searchQuery) return message.channel.send({ embeds: [errorEmbeds.no_lyrics_args_error] });

        const lyrics = await player.lyrics.search({ q: searchQuery }).catch(() => null);

        if (!lyrics.length) return message.channel.send({ embeds: [errorEmbeds.no_found_lyrics_error] });

        const embeds = [];
        let trimmedLyrics = lyrics[0].plainLyrics.slice(0, 1997);
        let isFirstEmbed = true;

        while (trimmedLyrics.length > 0) {
            const embed = createEmbed({
                description: `${isFirstEmbed ? `### ${emoji.largebluediamond} ${lyrics[0].artist.name} - ${lyrics[0].title}` : ''}\n${trimmedLyrics}`
            });
            embeds.push(embed);
            trimmedLyrics = trimmedLyrics.slice(1997);
            isFirstEmbed = false;
        }

        await message.channel.send({ embeds });
    },
};