var ioUrl;
var appUrl;
var enablePassword;
var isReady = 0
var dataInCookies = {};
var cookieKey = 'controlPanel';

//App mode
var env = 'LOCAL'; // LOCAL, STAGE, PROD

function setEnvironmentSpecifics(env) {
    switch (env) {
        case 'LOCAL':
            ioUrl = 'http://10.0.0.186:5024';
            enablePassword = 0;
            break;
        case 'STAGE':
            ioUrl = 'http://52.163.63.199:5023';
            enablePassword = 0;
            break;
        case 'PROD':
            ioUrl = 'http://192.168.1.52:15000';
            enablePassword = 1;
            break;
    }
    //common
    appUrl = ioUrl + '/services/';

}

setEnvironmentSpecifics(env);