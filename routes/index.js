'use strict';
var express = require('express');
var router = express.Router();

module.exports = function makeRouterWithSockets(io, client) {

    // a reusable function
    function respondWithAllTweets(req, res, next) {
        client.query('SELECT tweets.id, users.name, tweets.content, users.pictureurl FROM tweets INNER JOIN users ON users.id=tweets.userid', function (err, result) {
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

    // create a new tweet
    router.post('/tweets', function (req, res, next) {
        var name = req.body.name;
        var content = req.body.text;
        var userid;

        client.query('INSERT INTO users (name) SELECT $1 WHERE NOT EXISTS (SELECT id FROM users WHERE name=$1)', [name], function (err, result) {
            client.query('SELECT id FROM users WHERE name=$1', [name], function (err, result) {
                console.log(result.rows);
            })
        });
    });

    // // replaced this hard-coded route with general static routing in app.js
    // router.get('/stylesheets/style.css', function(req, res, next){
    //   res.sendFile('/stylesheets/style.css', { root: __dirname + '/../public/' });
    // });

    return router;
}
