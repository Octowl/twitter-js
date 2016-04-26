var chalk = require('chalk');
var morgan = require('morgan');
var express = require('express');
var swig = require('swig');
swig.setDefaults({ cache: false });


var app = express();
//var swigResult = swig.compileFile('views/index.html');
app.engine('html',swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(morgan('tiny'))

app.use('/special', function(req, res, next){
    console.log(chalk.magenta('You has reached the special area! You are a genius!'));
    next();
})

app.get('/', function(req, res){
	res.render('index', {title: "TaiLer swift's Home Page", people: [{name: 'Find out more!'}, {name: "she's awesome!"}]});
})

app.get('/news', function(req,res){
    res.send("Breaking News: TAILor Swift given file, only gives back last 5 pages!");
})

app.listen(3000, function(){
    console.log("WHATEVER COREY!")
});
