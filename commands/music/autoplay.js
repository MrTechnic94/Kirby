'use strict';

const errorEmbeds = require('../../utils/errorEmbeds');
const { createEmbed } = require('../../utils/embedCreator');
const { useQueue } = require('discord-player');
const { emoji } = require('../../config/default');

module.exports = {
  name: 'autoplay',
  aliases: ['ap'],
  dj: true,
  cooldown: 2,
  async execute(_client, message) {
    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [errorEmbeds.voice_error] });

    const queue = useQueue(message.guild.id);

    if (!queue?.isPlaying()) return message.channel.send({ embeds: [errorEmbeds.empty_queue_error] });

    queue.setRepeatMode(queue.repeatMode === 3 ? 0 : 3);

    const mode = queue.repeatMode === 3 ? 'enabled' : 'disabled';

    message.channel.send({ embeds: [createEmbed({ description: `${emoji.checkmark} **Autoplay has been \`${mode}\`**` })] });
  },
};