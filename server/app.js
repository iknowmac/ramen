require('dotenv').load({path: '.env'});
require('./globals').load();

const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const fs = require('fs');
const nunjucks = require('nunjucks');
const mongoose = require('mongoose');

const app = express();

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With'
  );
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    return next();
  }
};

// Database connection with promises
const dbEnviroment = process.env.NODE_ENV === 'test' ? 'test' : '';
const db = require('./db')(dbEnviroment);

mongoose.Promise = global.Promise;
mongoose.connect(db.uri, (err, res) => {
  if(err) console.log(`Error connecting to database ${db.uri}` + err);
  console.log(`Connected to database ${db.uri}`);
});

// view engine setup
nunjucks.configure('views', {
  autoescape: true,
  noCache: true,
  express: app,
});
app.set('view engine', 'html');

// Allow CrossDomain
app.use(allowCrossDomain);

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true,
}));
app.use(express.static(path.join(__dirname, 'public')));

// Dynamically include routes (Controllers)
fs.readdirSync('./controllers').forEach(function(file) {
  if(file.substr(-3) == '.js') {
    const route = require('./controllers/' + file);
    route.controller(app);
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
