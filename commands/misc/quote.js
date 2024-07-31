'use strict';

const axios = require('axios');
const errorEmbeds = require('../../utils/errorEmbeds');
const { createEmbed } = require('../../utils/embedCreator');
const { emoji } = require('../../config/default');

module.exports = {
    name: 'quote',
    cooldown: 2,
    async run(_client, message) {
        try {
            const response = await axios.get('https://labs.bible.org/api/?passage=random&type=json');
            const quoteData = response.data[0];

            message.channel.send({
                embeds: [
                    createEmbed({
                        description: `### ${emoji.feather} ${quoteData.bookname} ${quoteData.chapter}:${quoteData.verse}\n${quoteData.text}`
                    }),
                ],
            });
        } catch {
            message.channel.send({ embeds: [errorEmbeds.catch_error] });
        }
    }
};