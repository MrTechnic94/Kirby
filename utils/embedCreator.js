'use strict';

const { EmbedBuilder } = require('discord.js');
const { embedOptions } = require('../config/default');

// Creating a function responsible for generating an embed
function createEmbed({ description, fields = {}, thumbnail, footer = {}, color }) {
    const embed = new EmbedBuilder();

    if (description) embed.setDescription(description);
    if (fields.length) embed.addFields(fields.filter(field => field.name && field.value));
    if (thumbnail) embed.setThumbnail(thumbnail);
    if (footer.text ?? footer.iconURL) embed.setFooter(footer);
    embed.setColor(color ?? (global.isDev ? embedOptions.devColor : embedOptions.defaultColor));

    return embed;
}

module.exports = { createEmbed };