var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mysql = require('mysql');
var session = require('express-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testRouter = require('./routes/test');
var app = express();
var dbRouter = require('./routes/db')
var postsRouter =require('./routes/posts')
var categoryRouter =require('./routes/category')
var todoRouter =require('./routes/todo')
var logintableRouter =require('./routes/logintable')
var authRouter = require('./routes/auth')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret :'login',
  resave : true,
  saveUninitialized: false
}));
//Disable cors
app.use((req, res, next) => { //doesn't send response just adjusts it
  res.header("Access-Control-Allow-Origin", "*") //* to give access to any origin
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization" //to give access to all the headers provided
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET'); //to give access to all the methods provided
    return res.status(200).json({});
  }
  next(); //so that other routes can take over
})
//routing
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/test', testRouter);
app.use('/db',dbRouter);
app.use('/posts',postsRouter);
app.use('/category',categoryRouter);
app.use('/todo',todoRouter);
app.use('/logintable',logintableRouter);
app.use('/',authRouter);
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