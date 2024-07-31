'use strict';

const os = require('node:os');
const { useMainPlayer } = require('discord-player');
const { formatTime } = require('../../utils/timeFormatter');
const { createEmbed } = require('../../utils/embedCreator');
const { emoji } = require('../../config/default');

module.exports = {
    name: 'debug',
    cooldown: 2,
    async run(client, message) {
        const player = useMainPlayer(message.guild.id);
        const formattedTime = formatTime(client.uptime);
        const system = os.platform();
        const cpuUsage = os.loadavg()[0];
        const memUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(0);
        const ping = client.ws.ping;

        message.channel.send({
            embeds: [
                createEmbed({
                    description: `### ${emoji.disk} Debug\nShard ${message.guild.shardId}\n\`\`\`Ping :: ${ping}ms\nUptime :: ${formattedTime}\nSystem :: ${system}\nCpu usage :: ${cpuUsage}%\nRam usage :: ${memUsage}mb\nGuids count :: ${client.guilds.cache.size}\nActive connections :: ${player.generateStatistics().queues.length}\`\`\``
                }),
            ],
        });
    },
};