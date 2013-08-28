var express = require("express"),
    mongoose = require('mongoose'),
    app = express(),
    _ = require('underscore');

mongoose.connect('mongodb://localhost/bb2');

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

/*app.url = function(resourceUri, controller) {
  var verbs = {
    'create': 'post',
    'read': 'get',
    'update': 'put',
    'destroy': 'delete'
  };
  for(var handler in verbs) {
    var method = verbs[handler];
    if (controller[handler]) {
      app[method](resourceUri, _.bind(controller["pre" + handler], controller));
    }
  }
};

module.exports.app = app;*/

/**/

var willy = require('./willy');

module.exports.app = new willy.App({
  db: 'bb2',
  express_mods: function() {}
});
