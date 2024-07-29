'use strict';

const errorEmbeds = require('../../utils/errorEmbeds');
const { createEmbed } = require('../../utils/embedCreator');
const { useQueue, QueueRepeatMode } = require('discord-player');
const { emoji } = require('../../config/default');

module.exports = {
  name: 'autoplay',
  aliases: ['ap'],
  dj: true,
  cooldown: 2,
  async run(_client, message) {
    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [errorEmbeds.voice_error] });

    const queue = useQueue(message.guild.id);

    if (!queue?.isPlaying()) return message.channel.send({ embeds: [errorEmbeds.queue_error] });

    queue.setRepeatMode(queue.repeatMode === QueueRepeatMode.AUTOPLAY ? QueueRepeatMode.OFF : QueueRepeatMode.AUTOPLAY);

    const mode = queue.repeatMode === QueueRepeatMode.AUTOPLAY ? 'enabled' : 'disabled';

    message.channel.send({ embeds: [createEmbed({ description: `${emoji.checkmark} **Autoplay has been \`${mode}\`**` })] });
  },
};