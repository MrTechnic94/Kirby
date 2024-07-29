'use strict';

const errorEmbeds = require('../../utils/errorEmbeds');
const { createEmbed } = require('../../utils/embedCreator');
const { lyricsExtractor } = require('@discord-player/extractor');
const { useQueue } = require('discord-player');
const { emoji } = require('../../config/default');

module.exports = {
    name: 'lyrics',
    cooldown: 2,
    async run(_client, message, args) {
        const queue = useQueue(message.guild.id);

        const searchQuery = args.join(' ') || (queue?.isPlaying() && queue.currentTrack.cleanTitle);

        if (!searchQuery) return message.channel.send({ embeds: [errorEmbeds.no_lyrics_args_error] });

        const lyricsFinder = lyricsExtractor(process.env.LYRICS_API);

        // const msg = await message.channel.send('🔎 **Wyszukuje tekst piosenki...**');

        const lyrics = await lyricsFinder.search(searchQuery).catch(() => null);

        if (!lyrics) return message.channel.send({ embeds: [errorEmbeds.no_found_lyrics_error] });
        // msg.delete();

        const embeds = [];
        let trimmedLyrics = lyrics.lyrics;
        let isFirstEmbed = true;

        while (trimmedLyrics.length > 0) {
            const embed = createEmbed({
                // title: isFirstEmbed ? `🎵 ${lyrics.artist.name} - ${lyrics.title}` : undefined,
                description: `${isFirstEmbed ? `### ${emoji.largebluediamond} ${lyrics.artist.name} - ${lyrics.title}` : ''}\n${trimmedLyrics.slice(0, 1997)}`
            });
            embeds.push(embed);
            trimmedLyrics = trimmedLyrics.slice(1997);
            isFirstEmbed = false;
        }

        // msg.delete();
        await message.channel.send({ embeds });
    },
};