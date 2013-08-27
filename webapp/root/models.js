(function(namespace) {

  var models = namespace.models;

  models.User = Bb.Model.extend({
    url: function() {
      return uri('users');
    }
  })

})(root);