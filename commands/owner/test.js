'use strict';

const logger = require('../../utils/consoleLogger');
// const { emoji } = require('../../config/default');
const { createEmbed } = require('../../utils/embedCreator');
const { useQueue } = require('discord-player');

module.exports = {
    name: 'test',
    cooldown: 2,
    ownerOnly: true,
    async execute(_client, message) {

        const queue = useQueue(message.guild.id);

        const embedData = {
            // url: 'https://example.com',
            // title: `${emoji.corssmark} Something is wrong!`,
            // image: 'https://example.com/image.png',
            // timestamp: Date.now(),
            description: `${queue.currentTrack.source}`,
            // fields: [
            //     { value: 'Wartość pola 1', inline: true },
            //     { name: 'Pole 2', value: 'Wartość pola 2', inline: true }
            // ],
            thumbnail: queue.currentTrack.thumbnail,
            // author: {
            //     name: 'Autor',
            // },
            // footer: {
            //     icon: 'https://example.com/footer-icon.png'
            // },
        };

        const embed = createEmbed(embedData);
        message.channel.send({ embeds: [embed] });
        logger.info(embedData.thumbnail);
    },
};