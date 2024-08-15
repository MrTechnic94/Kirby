'use strict';

const redis = require('../../utils/redis');
const errorEmbeds = require('../../utils/errorEmbeds');
const { PermissionsBitField } = require('discord.js');
const { createEmbed } = require('../../utils/embedCreator');
const { emoji } = require('../../config/default');

module.exports = {
    name: 'trackannounce',
    permission: PermissionsBitField.Flags.ManageMessages,
    cooldown: 2,
    async execute(_client, message, args) {
        if (args[0] !== 'on' && args[0] !== 'off') return message.channel.send({ embeds: [errorEmbeds.args_settings_error] });

        const newSettings = args[0] === 'off' ? 'false' : 'true';

        const guildData = await redis.hgetall(message.guild.id);

        const oldSettings = guildData.trackAnnounce ?? 'true';

        if (oldSettings === newSettings) return message.channel.send({ embeds: [errorEmbeds.setting_already_use_error] });

        try {
            await redis.hset(message.guild.id, {
                prefix: guildData.prefix ?? process.env.PREFIX,
                djRoleId: guildData.djRoleId,
                trackAnnounce: newSettings
            });

            message.channel.send({ embeds: [createEmbed({ description: `### ${emoji.checkmark} Success!\nTrack announce has been turned **${args[0]}**` })] });
        } catch {
            message.channel.send({ embeds: [errorEmbeds.catch_error] });
        }
    },
};