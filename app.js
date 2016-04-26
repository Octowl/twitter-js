var chalk = require('chalk');
var morgan = require('morgan');
var express = require('express');
var app = express();

app.use(morgan('tiny'))

app.use('/special', function(req, res, next){
    console.log(chalk.magenta('You has reached the special area! You are a genius!'))
    next();
})

app.get('/', function(req, res){
    res.send("Welcome!");
})

app.get('/news', function(req,res){
    res.send("Breaking News: TAILor Swift given file, only gives back last 5 pages!");
})

app.listen(3000, function(){
    console.log("WHATEVER COREY!")
});
