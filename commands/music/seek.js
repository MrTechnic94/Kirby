'use strict';

const errorEmbeds = require('../../utils/errorEmbeds');
const { parseTime } = require('../../utils/timeFormatter');
const { createEmbed } = require('../../utils/embedCreator');
const { useQueue } = require('discord-player');
const { emoji } = require('../../config/default');

module.exports = {
  name: 'seek',
  dj: true,
  cooldown: 2,
  async execute(_client, message, args) {
    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [errorEmbeds.voice_error] });

    const queue = useQueue();

    if (!queue?.isPlaying()) return message.channel.send({ embeds: [errorEmbeds.empty_queue_error] });

    if (queue.currentTrack.raw.live) return message.channel.send({ embeds: [errorEmbeds.track_live_error] });

    const seekTime = parseTime(args[0]);

    if (!seekTime || seekTime === 0) return message.channel.send({ embeds: [errorEmbeds.number_error] });

    if (seekTime >= queue.currentTrack.durationMS) return message.channel.send({ embeds: [errorEmbeds.time_seek_error] });

    queue.node.seek(seekTime);
    message.channel.send({ embeds: [createEmbed({ description: `${emoji.forward} **Playback set to \`${args[0]}\`**` })] });
  },
};