'use strict';

const errorEmbeds = require('../../utils/errorEmbeds');
const { embedOptions, emoji } = require('../../config/default');
const { createEmbed } = require('../../utils/embedCreator');
const { exec } = require('node:child_process');

module.exports = {
    name: 'cmd',
    ownerOnly: true,
    cooldown: 2,
    async run(_client, message, args) {
        if (!args.length) return message.channel.send({ embeds: [errorEmbeds.args_cmd_error] });

        exec(args.join(' '), (error, stdout) => {

            if (error) return message.channel.send({ embeds: [createEmbed({ description: `### ${emoji.crossmark} Something went wrong!\nAn error occurred while executing command\n\`\`\`${error}\`\`\``, color: embedOptions.errorColor })] });

            message.channel.send({ embeds: [createEmbed({ description: `### ${emoji.checkmark} Success!\nCommand was executed successfully\n\`\`\`${stdout}\`\`\`` })] });
        });
    },
};