(function(namespace) {

  var views = namespace.views;

  var Router = Backbone.Router.extend({
    
    routes: {
      'projects': 'main',
      'projects/new': 'createProject',
      'projects/:id': 'issues',
      'projects/:id/issues/new': 'createIssue',
      'projects/:id/settings': 'settings'
    },

    loginRequired: [
      'projects',
      'projects/new',
      'projects/:id',
      'projects/:id/issues/new',
      'projects/:id/settings'
    ],

    main: function() {
      new views.Main({
        el: $('#container')
      });
    },

    createProject: function() {
      new views.CreateProject({
        el: $('#container')
      });
    },

    issues: function(id) {
      new views.Issues({
        el: $('#container'),
        project: id
      });
    },

    createIssue: function(id) {
      new views.CreateIssue({
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