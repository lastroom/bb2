var willy = require('./willy'),
    models = require('./models');

var rand = function() {
  return Math.random().toString(36).substr(2);
};

var token = function() {
  return rand();
};

module.exports.UsersController = willy.Controller.extend({
  read: function(request, response) {
    models.User.find(function(err, collection) {
      return response.send(collection);
    });
  },
  create: function(request, response) {
    var use = null;
    request.args['password'] = willy.sha1(request.args.password);
    request.args['token'] = token();
    user = new models.User(request.args);
    user.save(function(err, model) {
      if (err) {
        console.log(err);
        return;
      }
      return response.send(model);
    });
  }
});

module.exports.UserController = willy.Controller.extend({
  read: function(request, response) {
    models.User.findById(request.params.id, function(err, model) {
      return response.send(model);
    });
  },
  update: function(request, response) {
    return response.send('Update');
  },
  destroy: function(request, response) {
    return response.send('Destroy');
  }
});

module.exports.AuthenticationController = willy.Controller.extend({
  create: function(request, response) {
    var password = willy.sha1(request.args.password);
    user = models.User.findOne({
      email: request.args.email,
      password: password,
      active: true
    }, function(err, model) {
      if (err) {
        console.log(err);
        return;
      }
      return response.send(model);
    });
  }
});
