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
            targets: [
                {
                    target: 'pino-pretty',
                    level: 'info',
                    options: {
                        colorize: true,
                        translateTime: 'SYS:HH:MM:ss'
                    }
                },
                {
                    target: 'pino/file',
                    level: 'error',
                    options: {
                        destination: './logs/error.log',
                        mkdir: true,
                        sync: false
                    }
                }
            ]
        }
    });
} else {
    logger = pino({
        transport: {
            targets: [
                {
                    target: 'pino/file'
                },
                {
                    target: 'pino/file',
                    level: 'error',
                    options: {
                        destination: './logs/error.log',
                        mkdir: true,
                        sync: false
                    }
                }
            ]
        }
    });
}

module.exports = logger;