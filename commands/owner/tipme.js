'use strict';

const { ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const { createEmbed } = require('../../utils/embedCreator');

module.exports = {
    name: 'tipme',
    ownerOnly: true,
    cooldown: 2,
    async run(_client, message) {
        const tipButton = new ButtonBuilder()
            .setLabel('Paypal')
            .setStyle(ButtonStyle.Link)
            .setURL('https://paypal.com/paypalme/MrTechnic94')
        // .setEmoji('');

        const row = new ActionRowBuilder().addComponents(tipButton);

        message.channel.send({ embeds: [createEmbed({ description: `### \`🩷\` Tip me\nIf you appreciate my work and want to contribute to development of bot.\nTip me in any amount. Thanks!` })], components: [row] });
    },
};