'use strict';

const errorEmbeds = require('../../utils/errorEmbeds');
const { createEmbed } = require('../../utils/embedCreator');
const { useQueue } = require('discord-player');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { emoji } = require('../../config/default');

module.exports = {
    name: 'playlist',
    aliases: ['queue', 'q', 'list'],
    cooldown: 2,
    async execute(_client, message) {
        const queue = useQueue(message.guild.id);

        if (!queue?.isPlaying()) return message.channel.send({ embeds: [errorEmbeds.queue_error] });

        let page = 0;
        const totalPages = Math.ceil(queue.tracks.size / 20) || 1;
        const tracks = queue.tracks.map((track, i) => `**${i + 1}.** [${track.cleanTitle}](${track.url}) [${track.duration}]`);

        const createQueueEmbed = () => createEmbed({
            description: `### ${emoji.info} Songs in playlist\n**Currently:**\n[${queue.currentTrack.cleanTitle}](${queue.currentTrack.url}) [${queue.currentTrack.duration}]\n\n**Next:**\n${queue.tracks.size === 0 ? 'No songs' : tracks.slice(page * 20, (page + 1) * 20).join('\n')}`,
            footer: {
                text: `Page ${page + 1}/${totalPages}${queue.tracks.size > 0 ? ` • ${queue.tracks.size} ${queue.tracks.size === 1 ? 'song' : 'songs'}` : ''}`
            },
        });

        if (queue.tracks.size <= 20) return message.channel.send({ embeds: [createQueueEmbed()] });

        const backwardButton = new ButtonBuilder()
            .setCustomId('backward')
            .setLabel('◀️')
            .setStyle(ButtonStyle.Primary);

        const forwardButton = new ButtonBuilder()
            .setCustomId('forward')
            .setLabel('▶️')
            .setStyle(ButtonStyle.Primary);

        const createActionRow = () => {
            const row = new ActionRowBuilder();
            if (page > 0) row.addComponents(backwardButton);
            if (page < totalPages - 1) row.addComponents(forwardButton);
            return row;
        };

        const msg = await message.channel.send({ embeds: [createQueueEmbed()], components: [createActionRow()] });

        const filter = (interaction) => interaction.user.id === message.author.id;

        const collector = msg.createMessageComponentCollector({ filter, time: 120000 });

        collector.on('collect', async (interaction) => {
            if (interaction.customId === 'backward' && page > 0) {
                page--;
            } else if (interaction.customId === 'forward' && page < totalPages - 1) {
                page++;
            }

            await interaction.update({ embeds: [createQueueEmbed()], components: [createActionRow()] });
        });

        collector.on('end', () => {
            msg.edit({ components: [] });
        });
    },
};