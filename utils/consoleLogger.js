'use strict';

const pino = require('pino');

let pinoPrettyAvailable = false;

try {
    require.resolve('pino-pretty');
    pinoPrettyAvailable = true;
} catch {
    console.warn('To achieve better formatting, install the pino-pretty module');
}

let logger;

if (pinoPrettyAvailable) {
    logger = pino({
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true,
                translateTime: 'SYS:HH:MM:ss'
            }
        }
    });
} else {
    logger = pino();
}

module.exports = logger;