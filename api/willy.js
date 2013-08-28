var mongoose = require('mongoose');
var _ = require('underscore');

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
  precreate: function(request, response) {
    module.exports.setCORS(response);
    if (this["create"]) {
      var data = request.body;
      if ('model' in request.body) {
        data = JSON.parse(request.body.model);
      }
      this["create"]({
        data: data,
        request: request,
        response: response,
      });
    }
  },
  extend: function(object) {
    return _.extend(object, this);
  }
};
