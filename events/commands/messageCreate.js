'use strict';

const redis = require('../../utils/redis');
const logger = require('../../utils/consoleLogger');
const errorEmbeds = require('../../utils/errorEmbeds');
const { embedOptions, emoji } = require('../../config/default');
const { createEmbed } = require('../../utils/embedCreator');
const { Events, PermissionsBitField } = require('discord.js');

// Map storing cooldown expiration times for commands
const cooldowns = new Map();

// Creating a variable and assigning required permissions to bot
const botPermissions = [
	{ name: PermissionsBitField.Flags.SendMessages, label: 'Send Messages' },
	{ name: PermissionsBitField.Flags.ReadMessageHistory, label: 'Read Message History' },
	{ name: PermissionsBitField.Flags.SendMessagesInThreads, label: 'Send Messages In Threads' },
	{ name: PermissionsBitField.Flags.Speak, label: 'Speak' },
	// { name: PermissionsBitField.Flags.PrioritySpeaker, label: 'Priority Speaker' },
	{ name: PermissionsBitField.Flags.Connect, label: 'Connect' },
	// { name: PermissionsBitField.Flags.UseVAD, label: 'Use Voice Activity' },
	{ name: PermissionsBitField.Flags.EmbedLinks, label: 'Embed Links' },
	{ name: PermissionsBitField.Flags.ViewChannel, label: 'View Channel' },
	{ name: PermissionsBitField.Flags.UseApplicationCommands, label: 'Use Application Commands' }
	// { name: PermissionsBitField.Flags.AddReactions, label: 'Add Reactions' }
];

module.exports = {
	name: Events.MessageCreate,
	async run(client, message) {
		// Checking if command was executed in a guild and if command author is not a bot
		if (message.author.bot || !message.guild) return;

		// Checking bot permissions
		const missingPermissions = botPermissions.filter(permission => !message.guild.members.me.permissions.has(permission.name));

		if (missingPermissions.length > 0) {
			const missingPermissionNames = missingPermissions.map(permission => permission.label).join('\n');
			return message.channel.send(`${emoji.crossmark} **I do not have  required permissions:\n\`\`\`${missingPermissionNames}\`\`\``).catch(() => null);
		}

		const guildData = await redis.hgetall(message.guild.id);
		const prefix = guildData?.prefix ?? process.env.PREFIX;

		// Checking if command starts with a prefix or bot mention
		if (!message.content.startsWith(prefix) && !message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) return;

		// Bot response to a mention
		if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
			return message.channel.send({
				embeds: [
					createEmbed({
						description: `**Hello** <@${message.author.id}> ${emoji.kirbyhi}\n**My prefix is: \`${prefix}\`**\n**If you want to learn more about my commands, type: \`${prefix}help\`**`,
					})
				],
			});
		}

		const args = message.content.slice(prefix.length).split(/ +/);
		const command = args.shift();
		const cmd = client.commands.get(command) ?? client.commands.get(client.aliases.get(command));

		// Checking if command exists
		if (!cmd) return;

		// Checking if command has a cooldown
		const now = Date.now();
		if (cmd.cooldown && cooldowns.has(cmd.name)) {
			const remainingTime = cooldowns.get(cmd.name) - now;

			if (remainingTime > 0) {
				const shortenedTime = (remainingTime / 1000).toFixed(1);
				return message.channel.send({ embeds: [createEmbed({ description: `### ${emoji.crossmark} Something went wrong!\nCooldown is still active, try again in **${shortenedTime}s**`, color: embedOptions.errorColor })] });
			}
		}

		// Setting a new cooldown expiration time
		const cooldownTime = cmd.cooldown * 1000;
		const newExpirationTime = now + cooldownTime;
		cooldowns.set(cmd.name, newExpirationTime);
		setTimeout(() => cooldowns.delete(cmd.name), cooldownTime);

		// Checking if user has required permissions
		if (cmd.permission && !message.member.permissions.has(cmd.permission) || (cmd.ownerOnly && process.env.OWNER_ID !== message.author.id)) {
			return message.channel.send({ embeds: [errorEmbeds.permission_error] });
		}

		// Checking if user has DJ role
		if (cmd.dj && guildData?.djRoleId && !message.member.roles.cache.has(guildData.djRoleId) && message.member.voice.channel?.members.size > 2 && !message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
			return message.channel.send({ embeds: [errorEmbeds.dj_permission_error] });
		}

		// Captures and displays command errors
		try {
			await cmd.run(client, message, args);
		} catch (err) {
			logger.error(`An error occurred while running command ${cmd.name}!\n${err}`);
		}
	},
};