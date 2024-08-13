'use strict';

const errorEmbeds = require('../../utils/errorEmbeds');
const { createEmbed } = require('../../utils/embedCreator');
const { emoji } = require('../../config/default');
const { request } = require('undici');

module.exports = {
    name: 'quote',
    cooldown: 2,
    async execute(_client, message) {
        try {
            const { body } = await request('https://labs.bible.org/api/?passage=random&type=json', { timeout: 1000 });

            const [quoteData] = await body.json();

            message.channel.send({
                embeds: [
                    createEmbed({
                        description: `### ${emoji.scroll} ${quoteData.bookname} ${quoteData.chapter}:${quoteData.verse}\n${quoteData.text}`
                    }),
                ],
            });
        } catch {
            message.channel.send({ embeds: [errorEmbeds.catch_error] });
        }
    }
};