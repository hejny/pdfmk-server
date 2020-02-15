"use strict";

// Based on https://github.com/ariya/phantomjs/blob/master/examples/rasterize.js
var page = require('webpage').create();
var system = require('system');
var address, output, callback;


phantom.onError = function(msg, trace) {
    var msgStack = ['PHANTOM ERROR: ' + msg];
    if (trace && trace.length) {
        msgStack.push('TRACE:');
        trace.forEach(function(t) {
        msgStack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line + (t.function ? ' (in function ' + t.function +')' : ''));
        });
    }
    console.log(msgStack.join('\n'));
    phantom.exit(1);
};


address = system.args[1];
output = system.args[2];
callback = system.args[3];

console.log('address',address);
console.log('output',output);
console.log('callback',callback);



{
    console.log('Creating PDF:');

    //page.viewportSize = { width: 600, height: 600 };
    page.paperSize = {format:'A4'}; // TODO: Support more formats

    page.open(address, function (status) {
        if (status !== 'success') {
            console.log('Unable to load the address!');
            phantom.exit(1);
        } else {


            /*window.setTimeout( function() {
                page.render(output);
                phantom.exit();
            }, 200);*/


            var capture = function() {
                page.render(output);
                phantom.exit();
            }
            
            if(callback){
                console.log('Capturing when called window.'+callback+' from inside the page.');

                window.setTimeout(function(){
                    console.log('window.'+callback+' not triggered in timeout so rendering without it.');
                    capture();
                    // TODO: configurable timeout
                }, 10000);

                page.onCallback = function (arg) {
                    capture();
                };

            }else{
                console.log('Capturing in 200 miliseconds.');
                window.setTimeout(capture, 200);
            }
            
        }
    });
}