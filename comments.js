// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.send('Hello World');
});

app.get('/comments', function(req, res) {
    fs.readFile(__dirname + '/comments.json', 'utf8', function(err, data) {
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

app.post('/comments', function(req, res) {
    fs.readFile(__dirname + '/comments.json', 'utf8', function(err, data) {
        data = JSON.parse(data);
        data.push(req.body);
        fs.writeFile(__dirname + '/comments.json', JSON.stringify(data, null, 4), function(err) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(data));
        });
    });
});

app.listen(3000, function() {
    console.log('Server is running on port 3000');
});


