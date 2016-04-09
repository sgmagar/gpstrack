var express = require('express');
var net = require('net');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose'),
  assert = require('assert');

var Locations = require('./models/location')

// connection URL
var url = 'mongodb://localhost:27017/gpsTrack';

mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we are connected
    console.log("Connected correctly to server");

})



var dashboard = require('./routes/dashboard');

var app = express();
var http = require('http').createServer(app);

var tcpServer = net.createServer(function (c) {
  console.log('server connected');
  c.on('end', function() {
    console.log('server disconnected');
  });
  c.write('hello\r\n');
  c.pipe(c);
});

tcpServer.listen(3005,'128.199.162.102', function(){
  console.log('server bound');
});

var io = require('socket.io')(http);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', dashboard);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.end(err.message);
});

// Socket From here
io.on('connection', function(socket){
  socket.on('querydate', function (data){
    socket.emit('datedata', data);
  });
});



http.listen(3000,'localhost', function(){
  console.log('listening on http://localhost:' + 3000+'/');
});

