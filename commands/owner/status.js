'use strict';

const errorEmbeds = require('../../utils/errorEmbeds');
const { createEmbed } = require('../../utils/embedCreator');
const { ActivityType } = require('discord.js');
const { emoji } = require('../../config/default');

module.exports = {
    name: 'status',
    ownerOnly: true,
    cooldown: 2,
    async execute(client, message, args) {
        if (!args.length) return message.channel.send({ embeds: [errorEmbeds.args_status_error] });

        const query = args[0] === 'clear' ? 'Type k!help' : args.join(' ');

        client.user.setPresence({
            activities: [{
                name: query,
                type: ActivityType.Custom
            }]
        });

        message.channel.send({ embeds: [createEmbed({ description: `### ${emoji.checkmark} Success!\nStatus has been changed to **${query}**` })] });
    },
};