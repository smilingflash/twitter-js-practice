const express = require('express');
const app = express(); // creates an instance of an express application
const chalk = require('chalk');
const nunjucks = require('nunjucks');
const routes = require('./routes')
const path = require('path');
const morgan = require('morgan');
const socketio = require('socket.io');
const bodyParser = require('body-parser');

// templating boilerplate setup
app.engine('html', nunjucks.render); // how to render html templates
app.set('view engine', 'html'); // what file extension do our templates have
nunjucks.configure('views', { noCache: true }); // where to find the views, caching off

// logging middleware
// app.use(function (req, res, next) {
//   console.log(chalk.magenta('Middleware logged okay!'));
//   next();
// })

app.use(morgan('dev'));

// body parser
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

// start server
var server = app.listen(3000, function() {
  console.log(chalk.cyan('Connected and server listening!'));
});

var io = socketio.listen(server);

// creates a static path that will map every incoming route to the /public folder
app.use(express.static(path.join(__dirname, '/public')));

// accesses our routes module
app.use('/', routes(io));
