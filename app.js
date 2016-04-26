var chalk = require('chalk');
var morgan = require('morgan');
var express = require('express');
var swig = require('swig');

var routes = require('./routes');

swig.setDefaults({ cache: false });


var app = express();
//var swigResult = swig.compileFile('views/index.html');
app.engine('html',swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(morgan('tiny'))

app.use(express.static('public'));
app.use('/special', function(req, res, next){
    console.log(chalk.magenta('You has reached the special area! You are a genius!'));
    next();
})

app.use('/', routes);

// app.get('/', function(req, res){
// 	res.render('index', {title: "TaiLer swift's Home Page", people: [{name: 'Find out more!'}, {name: "she's awesome!"}]});
// })
//
// app.



app.listen(3000, function(){
    console.log("WHATEVER COREY!")
});
