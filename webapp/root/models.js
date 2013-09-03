(function(namespace) {

  var models = namespace.models;

  models.User = Bb.Model.extend({
    url: function() {
      return uri('users');
    }
  });

  models.Authenticate = Bb.Model.extend({
    url: function() {
      return uri('authenticate');
    }
  })

})(root);