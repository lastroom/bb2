(function(namespace) {

  var views = namespace.views;

  var Router = Backbone.Router.extend({
    
    routes: {
      'settings': 'main',
    },

    main: function() {
      new views.Main({
        el: $('#container')
      });
    },

  });

  new Router();

})(settings);