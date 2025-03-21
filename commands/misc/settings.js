'use strict';

const redis = require('../../utils/redis');
const { createEmbed } = require('../../utils/embedCreator');
const { useQueue } = require('discord-player');
const { emoji } = require('../../config/default');

module.exports = {
    name: 'settings',
    aliases: ['config', 'cfg'],
    cooldown: 2,
    async execute(_client, message) {
        const queue = useQueue();
        const guildData = await redis.hgetall(message.guild.id);
        const prefix = guildData.prefix ?? process.env.PREFIX;
        const dj = guildData.djRoleId ? `<@&${guildData.djRoleId}>` : '**`none`**';

        if (!queue?.isPlaying()) return message.channel.send({ embeds: [createEmbed({ description: `### ${emoji.managment} Server settings\n**Prefix: \`${prefix}\`**\n**DJ role:** ${dj}\n**Autoplay: \`off\`**\n**Loop: \`off\`**\n**Volume: \`100%\`**` })] });

        const autoplay = queue.repeatMode === 3 ? '`on`' : '`off`';
        const loop = queue.repeatMode === 0 ? '`off`' : queue.repeatMode === 1 ? '`track`' : '`playlist`';

        message.channel.send({
            embeds: [
                createEmbed({
                    description: `### ${emoji.managment} Server settings\n**Prefix: \`${prefix}\`**\n**DJ role:** ${dj}\n**Autoplay: ${autoplay}**\n**Loop: ${loop}**\n**Volume: \`${queue.node.volume}%\`**`
                }),
            ],
        });
    },
};