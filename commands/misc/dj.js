'use strict';

const redis = require('../../utils/redis');
const errorEmbeds = require('../../utils/errorEmbeds');
const { createEmbed } = require('../../utils/embedCreator');
const { PermissionsBitField } = require('discord.js');
const { emoji } = require('../../config/default');

module.exports = {
  name: 'dj',
  permission: PermissionsBitField.Flags.ManageMessages,
  cooldown: 2,
  async execute(_client, message, args) {
    const guildData = await redis.hgetall(message.guild.id);
    const role = message.mentions.roles?.first() || message.guild.roles.cache.find((r) => r.name === args[0]) || message.guild.roles.cache.get(args[0]);

    switch (args[0]) {
      case 'remove':
        if (!message.guild.roles.cache.has(guildData.djRoleId)) return message.channel.send({ embeds: [errorEmbeds.dj_set_error] });

        await redis.hset(message.guild.id, {
          prefix: guildData.prefix ?? process.env.PREFIX,
          djRoleId: null
        });

        message.channel.send({ embeds: [createEmbed({ description: `### ${emoji.checkmark} Success!\nDJ role removed` })] });
        break;

      default:
        if (!role) return message.channel.send({ embeds: [errorEmbeds.role_error] });

        if (guildData.djRoleId === role.id) return message.channel.send({ embeds: [errorEmbeds.already_role_error] });

        await redis.hset(message.guild.id, {
          prefix: guildData.prefix ?? process.env.PREFIX,
          djRoleId: role.id
        });

        message.channel.send({ embeds: [createEmbed({ description: `### ${emoji.checkmark} Success!\nDJ role set to **${role}**` })] });
    }
  },
};