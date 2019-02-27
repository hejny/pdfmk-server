//todo purge from certificate logic
var page = require('webpage').create();
var system = require('system');

var usage = 'Usage: phantomjs ./phantom.js certificateURL.html destination.pdf';

phantom.onError = onErrorID('phantom');
page.onError = onErrorID('page');

var certificateURL = system.args[1];
var destination = system.args[2];
var consoleLogs = [];

if (!certificateURL) {
    onError('Observation ID is a required argument\n' + usage);
}
if (!destination) {
    onError('Destination is a required argument\n' + usage);
}

const VIEWPORT_SIZE = 854;
page.viewportSize = {
    width: VIEWPORT_SIZE,
    height: VIEWPORT_SIZE,
};
page.paperSize = {
    format: 'A4',
    orientation: 'portrait',
    margin: '0.25cm',
};
page.onConsoleMessage = function(message, line, file, level, functionName) {
    const messageString = ['string', 'number'].includes(typeof message)
        ? message
        : JSON.stringify(message, null, 2);
    consoleLogs.push(
        level.toUpperCase() +
            ': ' +
            messageString +
            '\n' +
            functionName +
            ' in ' +
            file +
            ' at ' +
            line,
    );
};

try {
    // page.open('file://' + certificateURL, function(status) {
    console.log(certificateURL);
    page.open(certificateURL, function(status) {
        if (status !== 'success') {
            onErrorID('load finished')(status);
        }
        // page.onCallback = function() {
        console.log('Rendering');
        page.render(destination, { format: 'pdf' });
        console.log(destination);
        page.close();
        slimer.exit();
        // };
    });
} catch (error) {
    onErrorID('run')(error);
}

function onErrorID(id) {
    return function(error) {
        console.log('Error in: ' + id);
        onError(error);
    };
}

function onError(error) {
    console.log('Console logs:\n' + consoleLogs.join('\n'));
    console.log(error);
    phantom.exit(1);
}
