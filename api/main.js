var express = require('express');
var willy = require('./willy');
var controllers = require('./controllers');

var app = new willy.App({
  database: {
    engine: 'mongodb',
    name: 'bb2',
    host: 'localhost',
    port: '',
    password: ''
  },
  express_config: function (scope) {
    scope.use(express.bodyParser());
    scope.use(express.methodOverride());
    scope.use(scope.router);
    scope.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  }
});

app.url("/users", controllers.UsersController);
app.url("/users/:id", controllers.UserController);

app.listen(4444);
