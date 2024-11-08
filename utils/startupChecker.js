'use strict';

const logger = require('./consoleLogger');

// Function to check presence of required parameters in .env file
function checkEnvVariables(variables) {
    for (const variable of variables) {
        if (!process.env[variable]) {
            logger.error(`Missing ${variable} in .env file`);
            process.exit(1);
        }
    }
}

// Checking if Node.js version is greater than v18
function checkNodeVersion() {
    const version = Number(process.versions.node.split('.')[0]);

    if (version < 18) {
        logger.error('Outdated Node.js version. Update to a newer version');
        process.exit(1);
    }
}

// Checking presence of FFmpeg
function checkFFmpeg() {
    const { execSync } = require('node:child_process');

    let isFFmpegStatic;

    try {
        require.resolve('ffmpeg-static');
        isFFmpegStatic = true;
    } catch {
        isFFmpegStatic = false;
    }

    try {
        execSync('ffmpeg -version', { stdio: 'ignore', timeout: 3000 });
    } catch {
        if (!isFFmpegStatic) {
            logger.error('FFmpeg not found');
            logger.error('Install FFmpeg or use ffmpeg-static');
            process.exit(1);
        }
    }
}

function startupChecker() {
    // Checking required environment variables
    checkEnvVariables(['TOKEN', 'OWNER_ID', 'PREFIX', 'DB_HOST', 'DB_PORT', 'DB_PASSWORD']);

    // Checking optional environment variables for developer mode
    if (global.isDev) checkEnvVariables(['TOKEN_DEV']);

    // Checking Node.js version
    checkNodeVersion();

    // Checking FFmpeg presence
    checkFFmpeg();
}

module.exports = { startupChecker };