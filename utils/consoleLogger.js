'use strict';

const pino = require('pino');

let isPinoPretty;

try {
    require.resolve('pino-pretty');
    isPinoPretty = true;
} catch {
    isPinoPretty = false;
    console.warn('To achieve better formatting, install the pino-pretty module');
}

let logger;

if (isPinoPretty) {
    logger = pino({
        level: 'debug',
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true,
                translateTime: 'SYS:HH:MM:ss'
            }
        }
    });
} else {
    logger = pino({
        level: 'debug'
    });
}

module.exports = logger;