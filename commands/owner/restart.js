'use strict';

const logger = require('../../utils/consoleLogger');
const errorEmbeds = require('../../utils/errorEmbeds');
const { createEmbed } = require('../../utils/embedCreator');
const { emoji } = require('../../config/default');

module.exports = {
    name: 'restart',
    ownerOnly: true,
    cooldown: 2,
    async execute(_client, message) {
        try {
            await message.channel.send({ embeds: [createEmbed({ description: `### ${emoji.checkmark} Success!\nRestarting bot, please wait...` })] });

            process.exit(0);
        } catch (err) {
            logger.error(err);
            message.channel.send({ embeds: [errorEmbeds.catch_error] });
        }
    },
};