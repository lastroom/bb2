var express = require("express"),
    mongoose = require('mongoose'),
    app = express();

mongoose.connect('mongodb://localhost/bb2');

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

module.exports.app = app;
