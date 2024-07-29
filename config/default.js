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
        AutoModerationRuleManager: 0,
        ApplicationCommandManager: 0,
        BaseGuildEmojiManager: 0,
        DMMessageManager: 0,
        GuildEmojiManager: 0,
        GuildMemberManager: 10,
        GuildBanManager: 0,
        GuildForumThreadManager: 0,
        GuildInviteManager: 0,
        GuildMessageManager: 0,
        GuildScheduledEventManager: 0,
        GuildStickerManager: 0,
        GuildTextThreadManager: 0,
        MessageManager: 10,
        PresenceManager: 0,
        ReactionManager: 0,
        ReactionUserManager: 0,
        StageInstanceManager: 0,
        ThreadManager: 0,
        ThreadMemberManager: 0,
        UserManager: 10,
        VoiceStateManager: 10,
        GuildMemberManager: {
            maxSize: 20,
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
    useLegacyFFmpeg: false,
    skipFFmpeg: true,
    maxFiltersEnabled: 1
    // audioQuality: 'highestaudio'
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
    // crossmark: '<:crossmark:1261606785974931527>',
    // checkmark: '<:checkmark:1261606784838275113>',
    // kirbyhi: '<a:kirbyhi:1261371504726114346>',
    // kirbyflying: '<a:kirbyflying:1261608842094051380>',
    // info: '<:info:1261992127756374016>',
    // managment: '<:managment:1262057371740668005>',
    // slash: '<:slash:1262060586251059272>'
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
    pausebutton: '\`⏸️\`',
    arrowforward: '\`▶️\`',
    largebluediamond: '\`🔷\`',
    rewind: '\`⏪\`',
    forward: '\`⏩\`',
    nextsong: '\`⏭️\`',
    question: '\`❓\`'
};

// Other settings
module.exports.embedOptions = {
    defaultColor: 0x6133FF,
    errorColor: 0xED4245,
    devColor: 0x6133FF
};