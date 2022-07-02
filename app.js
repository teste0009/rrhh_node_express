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

var usersRouter   = require('./routes/users');
var testsRouter   = require('./routes/tests');

var indexRouter           = require('./routes/index');
var empleadosRouter       = require('./routes/empleados');
// var evaluacionesRouter    = require('./routes/evaluaciones');
// var rotacionRouter        = require('./routes/rotacion');
var logoutRouter          = require('./routes/logout');

var app = express();

// Populates req.session BEFORE ROUTES !!!!!!!!!!!!!!
app.use(session({
  resave: true, // don't save session if unmodified
  saveUninitialized: true, // don't create session until something stored
  secret: 'keyboard dog', // cat
  rolling: true,
  // store: new RedisStore({client: redis.createClient('20585', '127.0.0.1')}),
  // store: new RedisStore({client: redisClient}),
  cookie: ('name', 'value', { maxAge: 10 * 60 * 1000, secure: false }) // 3600 * 1000 = 60 min * 60 seg * 1000 ms
}));

// Define Global Vars BEFORE ROUTES !!!!!!!!!!!!!!
app.locals.site = require('./config/site');
app.request.user = require('./controllers/User');
app.locals.user = app.request.user;
// app.locals.user.getSession(app.request);
// app.request.locals = app.request.user;
// app.request.user.getSession(app.request);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Define Routes Hook BEFORE ROUTES !!!!!!!!!!!!!!
// From: https://expressjs.com/en/guide/using-middleware.html
// This example shows a middleware function with no mount path. The function is executed every time the app receives a request.
app.use(function(req, res, next) {
  // if (req.method === 'GET' || req.method === 'POST') {
    // Do some code
    console.dir(req.originalUrl);
    console.dir(req.baseUrl);
    console.dir(req.path);
    // console.log(app._router.stack);
    // console.log(app.locals.site);

    let user = req.user;
    user.getSession(req);

    if ( ! user.isLogged() && ! user.bAuthRoute(req.path)) {
      console.log('* * * * * Redirect to / * * * * *');
      res.redirect('/');
    }

    console.log('Time: ', Date.now());
  // }

  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/tests', testsRouter);

app.use('/',              indexRouter);
app.use('/empleados',     empleadosRouter);
//app.use('/evaluaciones',  evaluacionesRouter);
//app.use('/rotacion',      rotacionRouter);
app.use('/logout',        logoutRouter);

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
