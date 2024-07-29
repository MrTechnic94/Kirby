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

const logger = require('./utils/consoleLogger');
const { clientOptions, clientPlayerOptions } = require('./config/default');
const { errorCatcher } = require('./utils/errorCatcher');
const { Client, Collection } = require('discord.js');
const { Player } = require('discord-player');
const { default: DeezerExtractor } = require('discord-player-deezer');
const { YoutubeiExtractor } = require("discord-player-youtubei");
require('dotenv').config({ path: './config/.env' });

// Allows capturing errors and checking presence of required parameters
errorCatcher();

// Initializing client with specified settings
const client = new Client(clientOptions);

// Loading discord-player
const player = new Player(client, {
	useLegacyFFmpeg: clientPlayerOptions.useLegacyFFmpeg,
	skipFFmpeg: clientPlayerOptions.skipFFmpeg
	// ytdlOptions: {
	// 	quality: playerOptions.audioQuality,
	// 	highWaterMark: 1 << 25
	// }
});

// Setting flag indicating whether developer mode is enabled
// const isDev = process.env.DEV_MODE === 'true';
global.isDev = process.env.DEV_MODE === 'true';

// List of extractors to load
// const extractors = global.isDev ? null : ext => ext !== 'YouTubeExtractor';

// Bot token
const token = global.isDev ? process.env.DEV_TOKEN : process.env.TOKEN;

// Loading commands and events handler
['commands', 'aliases'].forEach(name => client[name] = new Collection());
['./structures/commands', './structures/events'].forEach(path => require(path)(client));

(async () => {
	try {
		// Loading extractors for discord-player
		await player.extractors.register(DeezerExtractor);
		await player.extractors.register(YoutubeiExtractor, {
			authentication: process.env.YT_AUTHENTICATION
		});
		// await player.extractors.register(SpotifyExtractor, {
		// 	createStream: createYoutubeiStream
		// });
		// await player.extractors.loadDefault((ext) => !['YouTubeExtractor', 'SpotifyExtractor'].includes(ext));
		await player.extractors.loadDefault((ext) => ext !== 'YouTubeExtractor')
		logger.info('All extractors loaded');

		// Logging bot into Discord
		await client.login(token);
	} catch (err) {
		logger.error(err);
		process.exit(1);
	}
})();