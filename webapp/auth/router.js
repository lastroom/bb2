(function(namespace) {

  var Router = Backbone.Router.extend({
    
    routes: {
      'login': 'login',
      'register': 'register',
      'home': 'home',
      'logout': 'logout'
    },

    loginRequired: ['home', 'logout'],

    logoutRequired: ['login', 'register'],

    login: function() {
      var view = new namespace.views.Login();
      $('#container').html(view.render().$el);
    },

    register: function() {
      var view = new namespace.views.Register();
      $('#container').html(view.render().$el);
    },

    home: function() {
      var view = new namespace.views.Home();
      $('#container').html(view.render().$el);
    },

    logout: function() {
      window.user.logout();
      var login = App.pkg.settings.login_route || '#login';
      Backbone.history.navigate(login, {trigger: true}, {replace: true});
    }

  });

  new Router();

})(auth);