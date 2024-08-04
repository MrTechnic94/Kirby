'use strict';

const redis = require('../../utils/redis');
const logger = require('../../utils/consoleLogger');
const { Events } = require('discord.js');

module.exports = {
	name: Events.GuildDelete,
	async execute(_client, guild) {
		try {
			// Checking and removing an entry from database for selected guild
			const existingGuild = await redis.del(guild.id);

			// If guild has an entry in database, return information about its removal
			if (existingGuild) logger.info(`Deleted data from database for: ${guild.name}`);
		} catch (err) {
			logger.error(`Error while deleting data for: ${guild.name}\n${err}`);
		}
	},
};