var ioUrl;
var appUrl;
var isReady = 0

var env = 'LOCAL';

function setEnvironmentSpecifics(env) {
    switch (env) {
        case 'LOCAL':
            ioUrl = 'http://localhost:5024';
            enablePassword = 0;
            break;
    }
    appUrl = ioUrl + '/services/';

}

setEnvironmentSpecifics(env);
