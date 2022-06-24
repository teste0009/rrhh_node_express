var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

// pass the express to the connect redis module
// allowing it to inherit from session.Store
var RedisStore = require('connect-redis')(session);
const redis = require('redis')
let redisClient = redis.createClient({ legacyMode: true })
redisClient.connect().catch(console.error)

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testsRouter = require('./routes/tests');

var app = express();

// Populates req.session BEFORE ROUTES !!!!!!!!!!!!!!
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: true, // don't create session until something stored
  secret: 'keyboard dog', // cat
  // store: new RedisStore({client: redis.createClient('20585', '127.0.0.1')}),
  store: new RedisStore({client: redisClient}),
  cookie: ('name', 'value', { maxAge: 3600 * 1000, secure: false })
}));

app.locals.site = require('./config/site');
app.request.user = require('./controller/User');
app.request.user.getSession(app.request);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tests', testsRouter);

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
