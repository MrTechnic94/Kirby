'use strict';

// const emoji = require('./emoji');
const { createEmbed } = require('./embedCreator');
const { embedOptions, otherPlayerOptions, emoji } = require('../config/default');

// Variable containing messages
const messages = {
    queue_error: 'There are no songs in playlist',
    voice_error: 'You are not on my voice channel',
    member_voice_error: 'You are not on a voice channel',
    bot_voice_error: 'I am not on a voice channel',
    track_error: 'No such song found',
    track_back_error: 'There is no previous song',
    number_error: 'Invalid number',
    max_volume_error: 'Volume range must be 1-200',
    already_volume_error: 'Specified volume is already in use',
    muted_player_error: 'Player is muted',
    muted_bot_error: 'I am muted',
    already_voted_error: 'You have already voted',
    time_seek_error: 'Specified time is greater than or equal to song length',
    send_dm_error: 'I cannot send you a private message',
    same_prefix_error: 'You must provide a new prefix',
    already_prefix_error: 'This prefix is already in use',
    setting_already_use_error: 'This setting is already in use',
    prefix_change_error: 'You must specify prefix you want to use',
    role_error: 'No such role found',
    already_role_error: 'This role is already set',
    dj_set_error: 'DJ role not set',
    args_settings_error: 'You must provide a setting to use',
    args_category_error: 'You must provide a category name',
    args_command_error: 'You must provide a command name',
    args_status_error: 'You must provide a status name',
    args_guild_id_error: 'You must provide a guild ID',
    args_cmd_error: 'You must provide a command to execute',
    permission_error: 'You do not have permission to do this',
    dj_permission_error: 'You do not have DJ role',
    empty_queue_error: 'Playlist is empty',
    player_error: 'Player error occurred',
    catch_error: 'An unexpected error occurred',
    filters_error: 'No filter is enabled',
    max_filters_enabled_error: `Only **${otherPlayerOptions.maxFiltersEnabled}** filter can be enabled at the same time`,
    shuffle_error: 'At least 3 songs are required in playlist',
    full_channel_error: 'Voice channel is full',
    same_move_error: 'Cannot move song to the same place',
    no_found_lyrics_error: 'No lyrics found for this song',
    no_lyrics_args_error: 'Provide song name or start playing it',
    resumed_error: 'Player is not paused',
    paused_error: 'Player is already paused'
    // send_dm_success: '✅ Check your private messages',
    // remove_dj_success: '✅ DJ role removed',
    // restart_bot_success: '✅ Restarting the bot...',
    // skip_success: '⏩ Skipped the current song',
    // shuffle_success: '🔀 The playlist has been shuffled',
    // track_back_success: '◀️ Playing the previous song',
    // clear_success: '💨 The playlist has been cleared',
    // disabled_filters_success: '🎵 All filters have been disabled',
    // resume_success: '⏸️ `Resumed` song playback',
    // pause_success: '▶️ `Paused` song playback'
};

// Generating messages
const errorEmbeds = Object.fromEntries(Object.entries(messages).map(([key, description]) => [key, createEmbed({ description: `### ${emoji.crossmark} Something went wrong!\n${description}`, color: embedOptions.errorColor })]));

module.exports = errorEmbeds;