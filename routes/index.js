var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');
var bodyParser = require('body-parser');

router.get('/', function (req, res) {
    var tweets = tweetBank.list();
    res.render('index', {
        title: "TaiLer swift's Official Personal Tweetastic Home Page",
        tweets: tweets,
        showForm: true
    });
});

router.get('/news', function (req, res) {
    res.send("Breaking News: TAILor Swift given file, only gives back last 5 pages!");
})

router.get('/users/:name', function (req, res) {
    var name = req.params.name;
    var list = tweetBank.find({
        name: name
    });
    console.log(list);
    //console.log( req.params.name ); // --> 'nimit'
    res.render('index', {
        title: 'Twitter.js - Posts by ' + name,
        tweets: list
    })
});

router.get('/tweets/:id', function(req, res){
    var id = +req.params.id; 
    var twizzlers = tweetBank.find({
        id: id
    });
    res.render('index', {
        title: 'Twitter.js - Posts by' +  twizzlers[0].name,
        tweets: twizzlers
    });
});

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({extended:false}); 

router.post('/tweets', urlencodedParser, function(req,res){
    tweetBank.add(req.body.name, req.body.text);
    res.redirect('/');
});
module.exports = router;
