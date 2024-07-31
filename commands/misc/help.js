'use strict';

const redis = require('../../utils/redis');
const { createEmbed } = require('../../utils/embedCreator');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { emoji } = require('../../config/default');

module.exports = {
    name: 'help',
    aliases: ['h'],
    cooldown: 2,
    async run(_client, message) {
        const guildData = await redis.hgetall(message.guild.id);
        const prefix = guildData?.prefix ?? process.env.PREFIX;
        const totalPages = 2;
        let currentPage = 0;

        const commands = {
            music: [
                { name: 'leave', description: 'Bot leaves channel' },
                { name: 'volume [percentage]', description: 'Changes volume' },
                { name: 'clear', description: 'Clears current playlist' },
                { name: 'play <title | link>', description: 'Plays selected song' },
                { name: 'loop [off | track | playlist]', description: 'Enables or disables looping' },
                { name: 'skip', description: 'Starts a vote to skip song' },
                { name: 'forceskip', description: 'Skips current song' },
                { name: 'nowplaying', description: 'Shows information about current track' },
                { name: 'pause', description: 'Pauses song' },
                { name: 'resume', description: 'Resumes paused song' },
                { name: 'shuffle', description: 'Shuffles current playlist' },
                { name: 'playlist', description: 'Displays playlist' },
                { name: 'seek <hh:mm:ss>', description: 'Changes playback position' },
                { name: 'back', description: 'Plays previous song' },
                { name: 'filters [clear]', description: 'Shows available filters or clears them' },
                { name: 'autoplay', description: 'Toggles autoplay' },
                { name: 'remove <position>', description: 'Removes selected song from playlist' },
                { name: 'jump <position>', description: 'Jumps to selected song in playlist' },
                { name: 'move <from, to>', description: 'Moves a song to selected position' },
                { name: 'lyrics [title]', description: 'Displays lyrics for current or selected song' },
                { name: 'replay', description: 'Adds current song to beginning of playlist' }
            ],
            general: [
                { name: 'help', description: 'Kirby bot help command' },
                { name: 'debug', description: 'Shows information about bot' },
                { name: 'prefix <prefix>', description: 'Changes server prefix' },
                { name: 'prefix <remove>', description: 'Sets server prefix to default' },
                { name: 'dj <role>', description: 'Sets DJ role on server' },
                { name: 'dj <remove>', description: 'Removes DJ role' },
                { name: 'settings', description: 'Displays current server settings' },
                { name: 'trackannounce <on | off>', description: 'Toggles track announcements' },
                { name: 'quote', description: 'Random Bible quote' }
            ]
        };

        const embeds = [
            createEmbed({
                description: `### ${emoji.loudsound} Music commands\n` + commands.music.map(command => `\`${prefix}${command.name}\` - **${command.description}**`).join('\n'),
                footer: {
                    text: `Page ${currentPage + 1}/${totalPages}`
                },
            }),
            createEmbed({
                description: `### ${emoji.question} General commands\n` + commands.general.map(command => `\`${prefix}${command.name}\` - **${command.description}**`).join('\n')
            })
        ];

        const backwardButton = new ButtonBuilder()
            .setCustomId('backward')
            .setLabel('◀️')
            .setStyle(ButtonStyle.Primary);

        const forwardButton = new ButtonBuilder()
            .setCustomId('forward')
            .setLabel('▶️')
            .setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder();

        if (totalPages > 1) {
            if (currentPage > 0) row.addComponents(backwardButton);
            if (currentPage < totalPages - 1) row.addComponents(forwardButton);
        }

        const msg = await message.channel.send({ embeds: [embeds[currentPage]], components: [row] });

        const filter = interaction => interaction.user.id === message.author.id;

        const collector = msg.createMessageComponentCollector({ filter, time: 120000 });

        collector.on('collect', async interaction => {
            if (interaction.customId === 'backward' && currentPage > 0) {
                currentPage--;
            } else if (interaction.customId === 'forward' && currentPage < totalPages - 1) {
                currentPage++;
            }

            row.components = [];

            if (currentPage > 0) row.addComponents(backwardButton);
            if (currentPage < totalPages - 1) row.addComponents(forwardButton);

            updateEmbed();
            await interaction.update({ embeds: [embeds[currentPage]], components: [row] });
        });

        collector.on('end', () => {
            msg.edit({ components: [] });
        });

        function updateEmbed() {
            embeds[currentPage].setFooter({ text: `Page ${currentPage + 1}/${totalPages}` });
        }
    },
};