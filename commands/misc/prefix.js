'use strict';

const redis = require('../../utils/redis');
const errorEmbeds = require('../../utils/errorEmbeds');
const { createEmbed } = require('../../utils/embedCreator');
const { PermissionsBitField } = require('discord.js');
const { emoji } = require('../../config/default');

module.exports = {
    name: 'prefix',
    permission: PermissionsBitField.Flags.ManageMessages,
    cooldown: 2,
    async execute(_client, message, args) {
        if (!args.length) return message.channel.send({ embeds: [errorEmbeds.prefix_change_error] });

        const prefix = args[0] === 'remove' ? process.env.PREFIX : args[0];

        const guildData = await redis.hgetall(message.guild.id);

        const oldPrefix = guildData.prefix ?? process.env.PREFIX;

        if (oldPrefix === prefix) return message.channel.send({ embeds: [errorEmbeds.already_prefix_error] });

        try {
            await redis.hset(message.guild.id, {
                prefix: prefix,
                djRoleId: guildData.djRoleId,
                trackAnnounce: guildData.trackAnnounce ?? 'true'
            });

            message.channel.send({ embeds: [createEmbed({ description: `### ${emoji.checkmark} Success!\nPrefix set to **${prefix}**` })] });
        } catch {
            message.channel.send({ embeds: [errorEmbeds.catch_error] });
        }
    },
};