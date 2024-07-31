'use strict';

const logger = require('../../utils/consoleLogger');
const { emoji } = require('../../config/default');
const { createEmbed } = require('../../utils/embedCreator');

module.exports = {
    name: 'test',
    cooldown: 2,
    ownerOnly: true,
    async run(_client, message) {
        const embedData = {
            // url: 'https://example.com',
            // title: `${emoji.corssmark} Something is wrong!`,
            // image: 'https://example.com/image.png',
            // timestamp: Date.now(),
            description: `### ${emoji.checkmark} Success!\nBot has left guild\n\nGuild name:\n \`\`\`Testowanko\`\`\`\n Guild id:\n \`\`\`720710829346914306\`\`\``,
            // fields: [
            //     { value: 'Wartość pola 1', inline: true },
            //     { name: 'Pole 2', value: 'Wartość pola 2', inline: true }
            // ],
            // thumbnail: 'https://example.com/thumbnail.png',
            // author: {
            //     name: 'Autor',
            // },
            // footer: {
            //     icon: 'https://example.com/footer-icon.png'
            // },
        };

        const embed = createEmbed(embedData);
        message.channel.send({ embeds: [embed] });
        logger.info(embed);
    },
};