var mongoose = require('mongoose');

module.exports.Model = function(name, attributes, validators) {
  var schema = new mongoose.Schema(params);
  for(var i in validators) {
    schema.path(i).validate(validators[i]);
  }
  return mongoose.model(name, schema);
}
