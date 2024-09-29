'use strict';

const logger = require('../../utils/consoleLogger');
const errorEmbeds = require('../../utils/errorEmbeds');
const { createEmbed } = require('../../utils/embedCreator');
const { emoji } = require('../../config/default');
const { request } = require('undici');

module.exports = {
    name: 'quote',
    cooldown: 2,
    async execute(_client, message) {
        try {
            const { body } = await request('https://bible-api.com/?random=verse', { timeout: 1000 });

            const quoteData = await body.json();

            message.channel.send({
                embeds: [
                    createEmbed({
                        description: `### ${emoji.scroll} ${quoteData.reference}\n${quoteData.text}`
                    }),
                ],
            });
        } catch (err) {
            logger.error(err);
            message.channel.send({ embeds: [errorEmbeds.catch_error] });
        }
    }
};