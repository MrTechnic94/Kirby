'use strict';

// Basic bot settings
module.exports.botOptions = {
    activityName: 'Type k!help',
    activityType: 4
};

// Discord.js client settings
module.exports.clientOptions = {
    restRequestTimeout:        60000,
    messageEditHistoryMaxSize: 0,
    messageCacheMaxSize:       25,
    messageSweepInterval:      43200,
    messageCacheLifetime:      21600,
    intents:                   33409
};

// Discord-player client player settings
module.exports.clientPlayerOptions = {
    skipFFmpeg:        true,
    maxFiltersEnabled: 1
};

// Other discord-player player settings
module.exports.otherPlayerOptions = {
    leaveOnStop:          true,
    pauseOnEmpty:         true,
    leaveOnEndCooldown:   240000,
    leaveOnEmptyCooldown: 60000,
    bufferingTimeout:     3000,
    connectionTimeout:    20000
};

// Emoji settings
module.exports.emoji = {
    kirbyhi:          '<a:kirbyhi:1263769697426604124>',
    kirbyflying:      '<a:kirbyflying:1263769706775707702>',
    crossmark:        '\`❌\`',
    checkmark:        '\`✅\`',
    info:             '\`📰\`',
    managment:        '\`🔧\`',
    greencircle:      '\`🟢\`',
    redcircle:        '\`🔴\`',
    disk:             '\`💾\`',
    dash:             '\`💨\`',
    crystalball:      '\`🔮\`',
    repeatone:        '\`🔂\`',
    repeat:           '\`🔁\`',
    dart:             '\`🎯\`',
    twistedarrows:    '\`🔀\`',
    mute:             '\`🔇\`',
    loudsound:        '\`🔊\`',
    sound:            '\`🔉\`',
    zap:              '\`⚡\`',
    largebluediamond: '\`🔷\`',
    pausebutton:      '\`⏸️\`',
    rewind:           '\`⏪\`',
    forward:          '\`⏩\`',
    nextsong:         '\`⏭️\`',
    question:         '\`❓\`',
    scroll:           '\`📜\`',
    normalredcircle:  '🔴'
};

// Other settings
module.exports.embedOptions = {
    defaultColor: 0x6133FF,
    errorColor:   0xED4245
};