const express = require('express');
const router = express.Router(); // mini express application capable of performing middleware and routing functions
const tweetBank = require('../tweetBank.js');
// const io = require('socket.io');

module.exports = function (io) {

  router.get('/', function (req, res){
    let tweets = tweetBank.list();
    res.render( 'index', { title: 'Twitter.js', tweets: tweets, showForm: true } );
  });

  router.get('/users/:username', function (req, res) {
    let username = req.params.username;
    let tweetsByName = tweetBank.find({name: username});
    res.render( 'index', {
      title: 'Twitter.js',
      tweets: tweetsByName,
      username: req.params.username,
      showForm: true
    })
  });

  router.get('/tweets/:tweetId', function (req, res) {
    let tweetId = req.params.tweetId;
    let tweetsWithThatId = tweetBank.find( { tweetId: Number(req.params.tweetId) }); //req.params.tweetID is a string, the object property tweetId is a number
    res.render( 'index', {
      title: 'Twitter.js',
      tweets: tweetsWithThatId,
      showForm: false
    });
  });

  router.post('/tweets', function(req, res){
    var newTweet = tweetBank.add(req.body.name, req.body.content);
    io.sockets.emit('new_tweet', newTweet);
    res.redirect('/');
  });

  return router;
}


