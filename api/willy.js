var express = require("express"),
    mongoose = require('mongoose'),
    _ = require('underscore'),
    crypto = require('crypto');

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
  var schema = new mongoose.Schema(attributes, { versionKey: false });
  for(var i in validators) {
    schema.path(i).validate(validators[i]);
  }
  return mongoose.model(name, schema);
}

module.exports.ForeignKey = function(modelName) {
  return { type: mongoose.Schema.Types.ObjectId, ref: modelName }
}

module.exports.ManyToMany = function(model, type) {
  var ref = type == undefined ? model.schema : mongoose.Schema.Types[type];
  return [ref];
}

module.exports.setCORS = function(headers) {
  headers.header('Access-Control-Allow-Origin', '*');
  headers.header('Access-Control-Allow-Headers', '*');
  headers.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  headers.header('Access-Control-Allow-Credentials', 'true');
  return headers;
}

module.exports.Controller = {
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
      request['args'] = request.query;
      this['destroy'](request, response);
    }
  },
  extend: function(object) {
    return _.extend(object, this);
  }
};

module.exports.sha1 = function(string) {
  var shasum = crypto.createHash('sha1').update(string);
  return shasum.digest('base64');
}
