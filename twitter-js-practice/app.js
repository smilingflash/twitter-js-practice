const express = require('express');
const app = express(); // creates an instance of an express application
const chalk = require('chalk');
const nunjucks = require('nunjucks');
const routes = require('./routes')
const path = require('path');
const morgan = require('morgan');

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

// accesses our routes module
app.use('/', routes);

// creates a static path that will map every incoming route to the /public folder
app.use(express.static(path.join(__dirname, '/public')));

app.listen(3000, function() {
  console.log(chalk.cyan('Connected and server listening!'));
});

