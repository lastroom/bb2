(function(namespace) {

  var models = namespace.models;
  var collections = namespace.collections;
  var views = namespace.views;

  var getTemplate = function(name) {
    return hbs.compile($('#root-' + name + '-template').html());
  }

  views.Main = Bb.View.extend({
    template: getTemplate('main'),
    initialize: function() {
      var me = this;
      me.render();
    },
    render: function() {
      var me = this;
      /*var user = new models.User({
        email: 'julian@pikhub.com' + new Date().getTime(),
        password: 'password'
      });
      user.save();*/
      $.get(uri('users/521e15e8f57db20000000001' + '?a=1&b=2')).done(function(response) {
        console.log(response);
      });
      me.$el.html(me.template());
      return me;
    }
  });

})(root);