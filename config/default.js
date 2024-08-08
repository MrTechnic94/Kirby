'use strict';

const { PresenceUpdateStatus, ActivityType, GatewayIntentBits, Options } = require('discord.js');

// discord.js client settings
module.exports.clientOptions = {
    restRequestTimeout: 60000,
    messageEditHistoryMaxSize: 0,
    messageCacheMaxSize: 25,
    messageSweepInterval: 43200,
    messageCacheLifetime: 21600,
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent
    ],
    makeCache: Options.cacheWithLimits({
        ...Options.DefaultMakeCacheSettings,
        MessageManager: 10,
        ThreadManager: 0,
        PresenceManager: 0,
        ReactionManager: 0,
        VoiceStateManager: 10,
        GuildMemberManager: {
            maxSize: 50,
            keepOverLimit: member => member.id === member.client.user.id
        }
    }),
    sweepers: {
        ...Options.DefaultSweeperSettings,
        messages: {
            interval: 3600,
            lifetime: 1800
        },
        users: {
            interval: 3600,
            filter: () => user => user.id !== user.client.user.id
        }
    },
    presence: {
        status: PresenceUpdateStatus.Online,
        activities: [{
            name: 'Type k!help',
            type: ActivityType.Custom
        }]
    },
    allowedMentions: {
        parse: ['users', 'roles'],
        repliedUser: true
    }
};

// Discord-player client player settings 
module.exports.clientPlayerOptions = {
    skipFFmpeg: true,
    maxFiltersEnabled: 1
};

// Other discord-player player settings
module.exports.otherPlayerOptions = {
    leaveOnEndCooldown: 240000,
    leaveOnEmptyCooldown: 60000,
    leaveOnStop: true,
    pauseOnEmpty: true,
    bufferingTimeout: 3000,
    connectionTimeout: 20000
};

// Emoji settings
module.exports.emoji = {
    kirbyhi: '<a:kirbyhi:1263769697426604124>',
    kirbyflying: '<a:kirbyflying:1263769706775707702>',
    crossmark: '\`❌\`',
    checkmark: '\`✅\`',
    info: '\`📰\`',
    managment: '\`🔧\`',
    greencircle: '\`🟢\`',
    redcircle: '\`🔴\`',
    disk: '\`💾\`',
    dash: '\`💨\`',
    crystalball: '\`🔮\`',
    repeatone: '\`🔂\`',
    repeat: '\`🔁\`',
    dart: '\`🎯\`',
    twistedarrows: '\`🔀\`',
    mute: '\`🔇\`',
    loudsound: '\`🔊\`',
    sound: '\`🔉\`',
    zap: '\`⚡\`',
    largebluediamond: '\`🔷\`',
    pausebutton: '\`⏸️\`',
    rewind: '\`⏪\`',
    forward: '\`⏩\`',
    nextsong: '\`⏭️\`',
    question: '\`❓\`',
    scroll: '\`📜\`'
};

// Other settings
module.exports.embedOptions = {
    defaultColor: 0x6133FF,
    errorColor: 0xED4245
};