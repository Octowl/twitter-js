var chalk = require('chalk');
var morgan = require('morgan');
var express = require('express');
var swig = require('swig');
var socketio = require('socket.io');

var app = express();

var routes = require('./routes');

swig.setDefaults({
    cache: false
});

var server = app.listen(3000, function () {
    console.log("WHATEVER COREY!")
});

var io = socketio.listen(server);
var router = routes(io);




app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(morgan('tiny'))

app.use(express.static('public'));
app.use('/special', function (req, res, next) {
    console.log(chalk.magenta('You has reached the special area! You are a genius!'));
    next();
})

app.use('/', router);
