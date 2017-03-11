const express = require('express');
const router = express.Router(); // mini express application capable of performing middleware and routing functions
const tweetBank = require('..tweetBank.js');

router.get('/', function (req, res){
  let tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets } );
});

// export the router so that app.js can use it as a middleware handler for all / routes and subroutes
module.exports = router;
