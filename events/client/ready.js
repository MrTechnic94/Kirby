'use strict';

const logger = require('../../utils/consoleLogger');
const { useMainPlayer } = require('discord-player');
const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async run(client) {
		// Displaying bot login information
		logger.info(`Logged in as ${client.user.tag}`);

		// If developer mode is enabled, generate a dependency report for discord-voip module
		if (global.isDev) {
			const player = useMainPlayer();
			logger.info(`Running in Dev Mode\n${player.scanDeps()}`);
		}
	},
};