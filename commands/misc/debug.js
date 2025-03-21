'use strict';

const os = require('node:os');
const { useMainPlayer } = require('discord-player');
const { formatTime } = require('../../utils/timeFormatter');
const { createEmbed } = require('../../utils/embedCreator');
const { emoji } = require('../../config/default');

module.exports = {
    name: 'debug',
    cooldown: 2,
    async execute(client, message) {
        const player = useMainPlayer();
        const formattedTime = formatTime(client.uptime);
        const system = os.platform();
        const cpuUsage = os.loadavg()[0];
        const memUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(0);
        const botPing = client.ws.ping;

        message.channel.send({
            embeds: [
                createEmbed({
                    description: `### ${emoji.disk} Debug\n\`\`\`Shard :: ${message.guild.shardId}\nPing :: ${botPing}ms\nUptime :: ${formattedTime}\nSystem :: ${system}\nCpu usage :: ${cpuUsage}%\nRam usage :: ${memUsage}mb\nGuids count :: ${client.guilds.cache.size}\nActive connections :: ${player.generateStatistics().queues.length}\`\`\``
                }),
            ],
        });
    },
};