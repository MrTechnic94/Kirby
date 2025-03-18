/**
 * This code was created with passion by MrTechnic.
 * It was originally used by DragonX bot, but later rewritten for Kirby bot,
 * but now I am making it available to everyone as an open-source project.
 * It is easy to set up, simple to use, and has a clear interface.
 * This code includes all features of Kirby bot,
 * such as handling music commands, managing cooldowns, and a lightweight bot structure.
 * I encourage you to use this code in your project,
 * as well as to report bugs and suggestions on GitHub.
 *
 * You can find me and my projects here: https://github.com/MrTechnic94/
 */

'use strict';

require('dotenv').config({ path: './config/.env' });
const { startupChecker } = require('./utils/startupChecker');
startupChecker();
const logger = require('./utils/consoleLogger');
const { botOptions, clientOptions, clientPlayerOptions } = require('./config/default');
const { DefaultExtractors } = require('@discord-player/extractor');
// const { YoutubeiExtractor } = require('discord-player-youtubei');
const { Client } = require('discord.js');
const { Player } = require('discord-player');

// Initializing client with specified settings
const client = new Client({
	restRequestTimeout: clientOptions.restRequestTimeout,
	messageEditHistoryMaxSize: clientOptions.messageEditHistoryMaxSize,
	messageCacheMaxSize: clientOptions.messageCacheMaxSize,
	messageSweepInterval: clientOptions.messageSweepInterval,
	messageCacheLifetime: clientOptions.messageCacheLifetime,
	intents: clientOptions.intents,
	presence: {
		activities: [{
			name: botOptions.activityName,
			type: botOptions.activityType
		}]
	},
	allowedMentions: {
		repliedUser: clientOptions.repliedUser,
		parse: clientOptions.parse
	}
});

// Loading discord-player
const player = new Player(client, {
	skipFFmpeg: clientPlayerOptions.skipFFmpeg
});

// Setting flag indicating whether developer mode is enabled
global.isDev = process.env.DEV_MODE === 'true';

// Bot token
const token = global.isDev ? process.env.DEV_TOKEN : process.env.TOKEN;

// Loading commands and events handler
client.commands = new Map();
client.aliases = new Map();

require('./structures/commands')(client);
require('./structures/events')(client);

(async () => {
	try {
		// Loading extractors for discord-player
		// await player.extractors.register(YoutubeiExtractor, {
		// 	authentication: process.env.YT_AUTHENTICATION,
		// 	streamOptions: {
		// 		highWaterMark: 2 * 1024 * 1024
		// 	}
		// });
		await player.extractors.loadMulti(DefaultExtractors);
		logger.info('All extractors loaded');

		// Generate a dependency report for discord-voip module
		logger.info(`\n${player.scanDeps()}`);

		// Debug mode
		if (process.env.DEBUG_MODE === 'true') {
			player.on('debug', (msg) => logger.debug(msg));
			player.events.on('debug', (_, msg) => logger.debug(msg));
		};

		// Logging bot into Discord
		await client.login(token);
	} catch (err) {
		logger.error(err);
		process.exit(1);
	}
})();