var express = require("express"),
    mongoose = require('mongoose'),
    _ = require('underscore');

var connectdb = function(name) {
  return {
    'mongodb': function(params) {
      mongoose.connect('mongodb://' + params.host + '/' + params.name);
    }
  }[name];
}

module.exports.App = function(params) {
  var app = express()

  if ('database' in params) {
    connectdb(params.database.engine)(params.database);
  }

  app.url = function(resourceUri, controller) {
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
  }

  return app;
}

module.exports.Model = function(name, attributes, validators) {
  var schema = new mongoose.Schema(attributes);
  for(var i in validators) {
    schema.path(i).validate(validators[i]);
  }
  return mongoose.model(name, schema);
}

module.exports.ForeignKey = function(modelName) {
  return { type: mongoose.Schema.Types.ObjectId, ref: modelName }
}

module.exports.setCORS = function(object) {
  object.header('Access-Control-Allow-Origin', '*'),
  object.header('Access-Control-Allow-Headers', '*'),
  object.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'),
  object.header('Access-Control-Allow-Credentials', 'true')
  return object;
}

module.exports.BaseController = {
  preread: function(request, response) {
    module.exports.setCORS(response);
    if (this['read']) {
      request['args'] = request.query;
      this['read'](request, response);
    }
  },
  precreate: function(request, response) {
    module.exports.setCORS(response);
    if (this['create']) {
      request['args'] = request.body;
      if ('model' in request.body) {
        request['args'] = JSON.parse(request.body.model);
      }
      this['create'](request, response);
    }
  },
  preupdate: function(request, response) {
    module.exports.setCORS(response);
    if (this['update']) {
      request['args'] = request.body;
      if ('model' in request.body) {
        request['args'] = JSON.parse(request.body.model);
      }
      this['update'](request, response);
    }
  },
  predestroy: function (request, response) {
    module.exports.setCORS(response);
    if (this['destroy']) {
      this['destroy'](request, response);
    }
  },
  extend: function(object) {
    return _.extend(object, this);
  }
};
