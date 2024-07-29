'use strict';

const logger = require('../utils/consoleLogger');
const path = require('node:path');
const { readdirSync } = require('node:fs');

module.exports = (client) => {
  const commandsDir = path.join(__dirname, '../commands/');

  readdirSync(commandsDir, { withFileTypes: true }).forEach((directory) => {
    if (!directory.isDirectory()) return;

    const commandFiles = readdirSync(path.join(commandsDir, directory.name))
      .filter((file) => file.endsWith('.js'));

    for (const file of commandFiles) {
      const command = require(path.join(commandsDir, directory.name, file));

      // Checking if command loads correctly
      if (typeof command.run !== 'function') {
        logger.error(`Error while loading command: ${directory.name}/${file}`);
        process.exit(1);
      }

      // Checking if command does not have same name as others
      if (client.commands.has(command.name)) {
        logger.warn(`Too many commands have same name: ${command.name}`);
        continue;
      }

      // Loading commands
      client.commands.set(command.name, command);
      logger.info(`Command ${command.name} has been loaded`);

      // Checking if command does not have same aliases as others
      if (Array.isArray(command.aliases)) {
        command.aliases.forEach((alias) => {
          if (client.aliases.has(alias)) {
            logger.warn(`Too many commands have same aliases: ${alias}`);
          } else {
            client.aliases.set(alias, command.name);
          }
        });
      }

      // Checking if command is owner only
      if (command.ownerOnly === true) command.ownerOnly = true;
    }
  });
};