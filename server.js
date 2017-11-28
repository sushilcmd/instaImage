var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var request = require('request');
var simpleInstagramScrape = require('simple-instagram-photo-scrape');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

var port = process.env.PORT || 5024;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/views/index.html');

});

app.post('/services/getImages', function(req, res) {
    var r = (req.body);
    var instaUrl = 'https://www.instagram.com/explore/tags/' + r.hashTag + '/?__a=1'
    var instaUrlMaxID = 'https://www.instagram.com/explore/tags/' + r.hashTag + '/?__a=1&max_id=' + r.end_cursor;
    var options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8',
            'User-Agent': 'my-reddit-client'
        }
    };
    if (r.end_cursor)
        options.url = instaUrlMaxID;
    else
        options.url = instaUrl;

    request(options, function(err, data, body) {
        res.json(data.body);
    });
})

http.listen(port, function() {
    console.log("listening on " + port);
});