var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('./config');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var personaRouter = require('./routes/personaRouter');
var notaRouter = require('./routes/notaRouter');
var valeRouter = require('./routes/valeRouter');

const mongoose = require('mongoose');

const Persona = require('./models/persona');

const url = config.mongoUrl;
const connect = mongoose.connect(url, {autoIndex: false});

connect.then((db) => {
  console.log('Connected correctly to server');
}, (err) => { console.log("ERROR: ", err); });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/personas', personaRouter);
app.use('/notas', notaRouter);
app.use('/vales', valeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
