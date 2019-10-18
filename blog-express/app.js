var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const RedisStore = require('connect-redis')(session)

const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');

var app = express();

app.use(logger('dev'));
app.use(express.json());  //有post请求数据获取postdata并塞到body中 
app.use(express.urlencoded({ extended: false })); //同上，postdata urlencoded方法 
app.use(cookieParser());

const redisClient = require('./db/redis')
const sessionStore = new RedisStore({
  client: redisClient
})
app.use(session({
  secret: 'kp4527KPH',
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    // resave: false,
    // saveUninitialized: false,
  },
  store: sessionStore
}))


app.use('/api/blog', blogRouter)
app.use('/api/user', userRouter)

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
