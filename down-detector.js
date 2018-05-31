const ping = require('ping');

setInterval(doStuff, 1000);

var lastState;
var connected;
var counter = 0;

function doStuff() {
    var lastPing;

    ping.promise.probe('google.com', {
        timeout: 10
    }).then((result) => {
        var time = getTime();
        connected = result.alive;   
        //log(connected);
        if (lastState == true && connected == false) {
            LostConnection();
        } else if (lastState == false && connected == true) {
            ConnectionRegained(counter);
            counter = 0;
        }

        if (connected == false) {
            counter++;            
        }
        lastState = connected;
    });
}

function ConnectionRegained(timedown) {
    var time = getTime();
    console.log (
        '[' + time + '] '
        + 'Connection regained after '
        + timedown
        + 's of downtime'
    );
}

function LostConnection() {
    var time = getTime();
    console.log (
        '[' + time + '] '
        + 'Lost Connection'
    );
}

function log(tolog) {
    var time = getTime();
    console.log (
        '[' + time + '] '
        + tolog
    );
}

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }
  
function getTime() {
    var t = new Date();
    var time = (pad(t.getHours(), 2) + ':' + pad(t.getMinutes(), 2) + ':' + pad(t.getSeconds(), 2))
    return time;
  }
