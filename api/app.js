var willy = require('./willy');
var controllers = require('./controllers');

var app = new willy.App({
  database: {
    engine: 'mongodb',
    name: 'bb2',
    host: 'localhost',
    port: '',
    password: ''
  }
});

app.configure(function() {
  var express = require('express');
  
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.url("/users", controllers.UsersController);
app.url("/users/:id", controllers.UserController);
app.url("/authenticate", controllers.AuthenticationController);

app.listen(4444);
