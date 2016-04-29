'use strict';
var express = require('express');
var router = express.Router();

module.exports = function makeRouterWithSockets(io, client) {

    // a reusable function
    function respondWithAllTweets(req, res, next) {
        client.query('SELECT tweets.id, users.name, tweets.content, users.pictureurl FROM tweets INNER JOIN users ON users.id=tweets.userid ORDER BY tweets.id DESC', function (err, result) {
            var tweets = result.rows;
            res.render('index', {
                title: "Twitter.js",
                tweets: tweets,
                showForm: true
            });
        });
    }

    // here we basically treet the root view and tweets view as identical
    router.get('/', respondWithAllTweets);
    router.get('/tweets', respondWithAllTweets);

    // single-user page
    router.get('/users/:username', function (req, res, next) {
        var username = req.params.username;
        client.query('SELECT * FROM tweets INNER JOIN users ON users.id=tweets.userid WHERE users.name=$1', [username], function (err, result) {
            var tweets = result.rows;
            res.render('index', {
                title: "Tweets by: " + username,
                tweets: tweets,
                showForm: true,
                username: username
            });
        });
    });

    // single-tweet page
    router.get('/tweets/:id', function (req, res, next) {
        var id = +req.params.id;
        client.query('SELECT * FROM tweets INNER JOIN users ON users.id=tweets.userid WHERE tweets.id=$1', [id], function (err, result) {
            var tweets = result.rows;
            res.render('index', {
                title: "Tweet id: " + id,
                tweets: tweets,
                showForm: true
            });
        });
    });

    function addNewTweet(userid, content) {
        client.query('INSERT INTO tweets (userid, content) VALUES ($1, $2)', [userid, content], function (err, data) {
            client.query('SELECT * FROM tweets INNER JOIN users ON users.id=tweets.userid WHERE users.id=$1 AND tweets.content=$2', [userid, content], function (err, result) {
                var newTweet = result.rows[0];
                console.log(newTweet)
                io.sockets.emit('new_tweet', newTweet);
            });
        });
    }

    function addAndReturnNewUser(name) {
        var randomPicture = "http://lorempixel.com/120/120/";
        var user;
        var query = client.query('INSERT INTO users (name, pictureurl) VALUES ($1,$2)', [name, randomPicture], function(err, result){
            if(err) res.status(500).send('WE BROKE IT!');
            client.query('SELECT id FROM users WHERE name=$1', [name], function(err, result){
                user = result.rows[0];
            });
        });

        query.on('end')
    }

    // create a new tweet
    router.post('/tweets', function (req, res, next) {
        var name = req.body.name;
        var content = req.body.text;
        var userid;
        var query = client.query('SELECT id FROM users WHERE name=$1', [name], function (err, result) {
            var user = result.rows[0];
            if(!user) {
                addAndReturnNewUser(name);

            } else {
                userid = user.id;
            }
        });

        query.on('end', function(){
            console.log("I'm here");
            addNewTweet(userid, content);
            res.redirect('/');
        })
    });



    // // replaced this hard-coded route with general static routing in app.js
    // router.get('/stylesheets/style.css', function(req, res, next){
    //   res.sendFile('/stylesheets/style.css', { root: __dirname + '/../public/' });
    // });

    return router;
}
