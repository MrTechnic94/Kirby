'use strict';

const errorEmbeds = require('../../utils/errorEmbeds');
const { createEmbed } = require('../../utils/embedCreator');
const { emoji } = require('../../config/default');

module.exports = {
    name: 'reload',
    ownerOnly: true,
    cooldown: 2,
    async run(client, message, args) {
        const category = args[0];
        const command = args[1];

        if (!category) return message.channel.send({ embeds: [errorEmbeds.args_category_error] });
        if (!command) return message.channel.send({ embeds: [errorEmbeds.args_command_error] });

        try {
            delete require.cache[require.resolve(`../${category}/${command}`)];
            client.commands.delete(command);

            const newCommand = require(`../${category}/${command}`);
            client.commands.set(command, newCommand);

            message.channel.send({ embeds: [createEmbed({ description: `### ${emoji.checkmark} Success!\nReloaded **${command}** command` })] });
        } catch {
            message.channel.send({ embeds: [errorEmbeds.catch_error] });
        }
    },
};