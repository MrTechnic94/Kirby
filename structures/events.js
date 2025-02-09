'use strict';

const redis = require('../utils/redis');
const logger = require('../utils/consoleLogger');
const { readdirSync } = require('node:fs');
const { useMainPlayer } = require('discord-player');
const { join } = require('node:path');

module.exports = (client) => {
  const eventsDir = join(__dirname, '../events');

  readdirSync(eventsDir, { withFileTypes: true }).forEach((directory) => {
    if (!directory.isDirectory()) return;

    const eventFiles = readdirSync(join(eventsDir, directory.name))
      .filter((file) => file.endsWith('.js'));

    for (const file of eventFiles) {
      const eventName = file.slice(0, file.lastIndexOf('.'));
      const event = require(join(eventsDir, directory.name, file));
      logger.info(`Event ${eventName} has been loaded`);

      const eventHandler = (...args) => event.execute(client, ...args);
      const player = useMainPlayer();

      switch (directory.name) {
        case 'player':
          player.events.on(eventName, eventHandler);
          break;
        case 'process':
          process.on(eventName, eventHandler);
          break;
        case 'redis':
          redis.on(eventName, eventHandler);
          break;
        default:
          client[event.once ? 'once' : 'on'](eventName, eventHandler);
      }
    }
  });
};