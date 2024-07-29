'use strict';

const { embedOptions } = require('../config/default');
const { EmbedBuilder } = require('discord.js');

// Creating a function responsible for generating an embed
function createEmbed({ url, title, image, timestamp, description, fields = {}, thumbnail, author = {}, footer = {}, color }) {
    const embed = new EmbedBuilder();

    if (url) embed.setURL(url);
    if (title) embed.setTitle(title);
    if (image) embed.setImage(image);
    if (timestamp) embed.setTimestamp(new Date(timestamp));
    if (description) embed.setDescription(description);
    if (fields.length) {
        const validFields = fields.filter(field => field.name && field.value);
        embed.addFields(validFields);
    }
    if (thumbnail) embed.setThumbnail(thumbnail);
    if (author.name ?? author.icon ?? author.url) embed.setAuthor({ name: author.name, iconURL: author.icon, url: author.url });
    if (footer.text ?? footer.icon) embed.setFooter({ text: footer.text ?? null, iconURL: footer.icon });
    embed.setColor(color ?? (global.isDev ? embedOptions.devColor : embedOptions.defaultColor));

    return embed;
}

module.exports = { createEmbed };