var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const token = require("./services/token.js");
mongoose.connect('mongodb://127.0.0.1:27017/admin')
.then(res=>{
  console.log("mongodb connected")
})
.catch(error=>{
  console.log(error)
  
})

var app = express();
// app.use(async (req, res, next) => {
//   console.log('Time:', Date.now())
//   const accessToken = req.headers["acess-token"];
//   const tokenValue = await token.validateToken(accessToken);
//   if (tokenValue.userData.usertype == "admin"){

  
//   next()
//   }
//   else{
//     res.status(403).send("unauthorised");
//   }
//})
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var useradmRouter = require('./routes/useradm');
var productRouter = require('./routes/product');
var cartRouter = require('./routes/cart');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization,acess-token");
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/user', loginRouter);
app.use('/useradm',useradmRouter);
app.use('/Product',productRouter);
app.use('/cart',cartRouter);
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
