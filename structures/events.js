'use strict';

const logger = require('../utils/consoleLogger');
const path = require('node:path');
const { readdirSync } = require('node:fs');
const { useMainPlayer } = require('discord-player');

module.exports = (client) => {
  const eventsDir = path.join(__dirname, '../events/');

  readdirSync(eventsDir, { withFileTypes: true }).forEach((directory) => {
    if (!directory.isDirectory()) return;

    const eventFiles = readdirSync(path.join(eventsDir, directory.name))
      .filter((file) => file.endsWith('.js'));

    for (const file of eventFiles) {
      const eventName = file.slice(0, file.lastIndexOf('.'));
      const event = require(path.join(eventsDir, directory.name, file));
      logger.info(`Event ${eventName} has been loaded`);

      const eventHandler = (...args) => event.run(client, ...args);
      const player = useMainPlayer();

      switch (directory.name) {
        case 'player':
          player.events.on(eventName, eventHandler);
          break;
        case 'process':
          process.on(eventName, eventHandler);
          break;
        default:
          client[event.once ? 'once' : 'on'](eventName, eventHandler);
          break;
      }
    }
  });
};