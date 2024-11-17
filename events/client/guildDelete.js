'use strict';

const redis = require('../../utils/redis');
const logger = require('../../utils/consoleLogger');

module.exports = {
	name: 'guildDelete',
	async execute(_client, guild) {
		try {
			// If guild has an entry in database, return information about its removal
			if (await redis.del(guild.id)) logger.info(`Deleted data from database for: ${guild.name}`);
		} catch (err) {
			logger.error(`Error while deleting data for: ${guild.name}\n${err}`);
		}
	},
};