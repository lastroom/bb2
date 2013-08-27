var mongoose = require('mongoose');

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
