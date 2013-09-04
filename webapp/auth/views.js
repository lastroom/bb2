(function(namespace) {

  var views = namespace.views;
  var collections = namespace.collections;
  var models = namespace.models;

  var getTemplate = function(name) {
    return hbs.compile($('#auth-' + name + '-template').html());
  }

  views.Login = Bb.View.extend({
    template: getTemplate('login'),
    events: {
      'submit': 'onLogin'
    },
    render: function() {
      var me = this;
      me.$el.html(me.template());
      return me;
    },
    onLogin: function(e) {
      e.stopPropagation();
      e.preventDefault();
      var me = this;
      window.user.set(formToJSON(me.$('form')));
      window.user.login();
    }
  });

  views.Register = Bb.View.extend({
    template: getTemplate('register'),
    events: {
      'submit': 'onRegister'
    },
    render: function() {
      var me = this;
      me.$el.html(me.template());
      return me;
    },
    onRegister: function(e) {
      e.stopPropagation();
      e.preventDefault();
      var me = this;
      window.user.set(formToJSON(me.$('form')));
      window.user.register();
    }
  });

  views.Home = Bb.View.extend({
    template: getTemplate('home'),
    render: function() {
      var me = this;
      me.$el.html(me.template());
      return me;
    }
  });

})(auth);