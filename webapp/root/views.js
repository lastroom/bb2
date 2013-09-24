(function(namespace) {

  var models = namespace.models;
  var collections = namespace.collections;
  var views = namespace.views;

  var getTemplate = function(name) {
    return hbs.compile($('#root-' + name + '-template').html());
  }

  hbs.registerPartial('header', getTemplate('header'));

  views.Main = Bb.View.extend({
    template: getTemplate('main'),
    initialize: function() {
      var me = this;
      me.render();
    },
    render: function() {
      var me = this;
      me.$el.html(me.template());
      if (isAuthenticated()) Backbone.history.navigate('#projects', {trigger: true}, {replace: true});
      return me;
    }
  });

})(root);