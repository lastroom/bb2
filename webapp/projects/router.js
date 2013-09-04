(function(namespace) {

  var views = namespace.views;

  var Router = Backbone.Router.extend({
    
    routes: {
      'projects': 'main',
      'projects/new': 'create',
      'projects/:id': 'info',
      'projects/:id/settings': 'settings'
    },

    loginRequired: [
      'projects',
      'projects/new',
      'projects/:id',
      'projects/:id/settings'
    ],

    main: function() {
      new views.Main({
        el: $('#container')
      });
    },

    create: function() {
      new views.Create({
        el: $('#container')
      });
    },

    info: function(id) {
      new views.Info({
        el: $('#container'),
        project: id
      });
    },

    settings: function(id) {
      new views.Settings({
        el: $('#container'),
        project: id
      });
    }

  });

  new Router();

})(projects);