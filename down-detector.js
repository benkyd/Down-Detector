const ping = require('ping');
const fs = require('fs');
const moment = require('moment');

setInterval(doStuff, 1000);

let lastState;
let connected;
let counter = 0;

function doStuff() {
    let lastPing;

    ping.promise.probe('google.com', {
        timeout: 10
    }).then((result) => {
        connected = result.alive;
        //log(connected);
        if (lastState == true && connected == false) {
            LostConnection();

        } else if (lastState == false && connected == true) {
            if (counter > 5) {
                ConnectionRegained(counter);
            }
            counter = 0;
        }

        if (connected == false) {
            counter++;
        }

       lastState = connected;
    });
}

const dateFormat = 'DD-MM-YY HH:MM:ss';

function ConnectionRegained(timedown) {
    let output = '[' + moment().format(dateFormat) + '] Connection regained after ' + timedown + 's of downtime';
    console.log(output);
    fs.writeFileSync('logs.log', output + '\n');
}

function LostConnection() {
    let output = '[' + moment().format(dateFormat) + '] Lost Connection';
    console.log(output);
    fs.writeFileSync('logs.log', output + '\n');
}

function log(tolog) {
    let output = '[' + moment().format(dateFormat) + '] ' + tolog;
    console.log(output);
    fs.writeFileSync('logs.log', output + '\n');
}
