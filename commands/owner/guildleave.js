'use strict';

const errorEmbeds = require('../../utils/errorEmbeds');
const { embedOptions, emoji } = require('../../config/default');
const { createEmbed } = require('../../utils/embedCreator');

module.exports = {
    name: 'guildleave',
    aliases: ['gleave'],
    ownerOnly: true,
    cooldown: 2,
    async execute(client, message, args) {
        if (!args.length) return message.channel.send({ embeds: [errorEmbeds.args_guild_id_error] });

        const guild = client.guilds.cache.get(args[0]);

        if (!guild) return message.channel.send({ embeds: [createEmbed({ description: `### ${emoji.crossmark} Something went wrong!\nGuild **${args[0]}** not found`, color: embedOptions.errorColor })] });

        try {
            await guild.leave();

            message.channel.send({ embeds: [createEmbed({ description: `### ${emoji.checkmark} Success!\nBot has left guild\nGuild name:\n \`\`\`${guild.name}\`\`\`\n Guild id:\n \`\`\`${guild.id}\`\`\`` })] });
        } catch {
            message.channel.send({ embeds: [errorEmbeds.catch_error] });
        }
    },
};