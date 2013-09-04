(function(namespace) {

  var models = namespace.models;

  models.User = models.UserModel.extend({
    loginURL: uri('authenticate'),
    registerURL: uri('users')
  });

})(auth);