var willy = require('./willy');
var models = require('./models');

module.exports.UsersController = willy.BaseController.extend({
  read: function(request, response) {
    models.User.find(function(err, collection) {
      return response.send(collection);
    });
  },
  create: function(request, response) {
    var user = new models.User(request.args);
    user.save(function(err) {
      if(err) {
        console.log(err);
        return;
      }
      return response.send(request.args);
    });
  }
});

module.exports.UserController = willy.BaseController.extend({
  read: function(request, response) {
    models.User.findById(request.params.id, function(err, model) {
      return response.send(model);
    });
  }
});
