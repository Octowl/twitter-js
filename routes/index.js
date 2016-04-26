var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');

router.get('/', function (req, res) {
  var tweets = tweetBank.list();
  res.render( 'index', {title: "TaiLer swift's Official Personal Tweetastic Home Page", tweets: tweets } );
});

router.get('/news', function(req,res){
    res.send("Breaking News: TAILor Swift given file, only gives back last 5 pages!");
})

module.exports = router;
