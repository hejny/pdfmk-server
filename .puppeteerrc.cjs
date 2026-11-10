const { join } = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
    // Store browser binaries inside the project directory so they are packaged into the Cloud Functions container
    cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};
