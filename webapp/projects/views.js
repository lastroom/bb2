(function(namespace) {

  var views = namespace.views;
  var collections = namespace.collections;
  var models = namespace.models;

  var getTemplate = function(name) {
    return hbs.compile($('#projects-' + name + '-template').html());
  }

  views.Main = Bb.View.extend({
    template: getTemplate('main'),
    initialize: function() {
      var me = this;
      me.render();
    },
    render: function() {
      var me = this;
      var projects = new collections.Projects({});
      projects.addParam('token', window.user.get('token'));
      projects.fetch().done(function() {
        me.$el.html(me.template({
          projects: projects.toJSON()
        }));
      });
      return me;
    }
  });

  views.Create = Bb.View.extend({
    template: getTemplate('create'),
    events: {
      'submit': 'onCreate'
    },
    initialize: function() {
      var me = this;
      me.render();
    },
    render: function() {
      var me = this;
      me.$el.html(me.template({
        token: window.user.get('token')
      }));
      return me;
    },
    onCreate: function(e) {
      e.stopPropagation();
      e.preventDefault();
      var me = this;
      var data = formToJSON(me.$('form'));
      var project = new models.Project(data);
      project.save().done(function(response) {
        Backbone.history.navigate('#projects', {trigger: true}, {replace: true});
      });
    }
  });

  views.Info = Bb.View.extend({
    template: getTemplate('info'),
    initialize: function() {
      var me = this;
      me.render();
    },
    render: function() {
      var me = this;
      var project = new models.Project({
        id: me.options.project
      });
      project.addParam('token', window.user.get('token'));
      project.fetch().done(function() {
        me.$el.html(me.template(project.toJSON()));
      });
      return me;
    }
  });

  views.Settings = Bb.View.extend({
    template: getTemplate('settings'),
    events: {
      'click .module-btn': 'onOpenParamsList',
    },
    initialize: function() {
      var me = this;
      me.render();
    },
    render: function() {
      var me = this;
      me.model = new models.Project({
        id: me.options.project
      });
      me.model.addParam('token', window.user.get('token'));
      me.model.fetch().done(function() {
        me.$el.html(me.template(me.model.toJSON()));
      });
      return me;
    },
    onOpenParamsList: function(e) {
      var me = this;
      if (me.$('.active')) {
        me.$('.active').removeClass('active');
      }
      var target = me.$(e.currentTarget);
      target.closest('li').addClass('active');
      new views.ParamsList({
        model: me.model,
        type: target.data('type'),
        el: me.$('.local-container')
      });
    }
  });

  views.ParamsList = Bb.View.extend({
    template: getTemplate('params-list'),
    events: {
      'click .create': 'onCreate',
      'click .edit': 'onUpdate'
    },
    initialize: function() {
      var me = this;
      me.model.set('list', me.model.get(me.options.type.toLowerCase()));
      me.render();
    },
    render: function() {
      var me = this;
      me.$el.off();
      me.$el.html(me.template(me.model.toJSON()));
      return me;
    },
    onCreate: function(e) {
      var me = this;
      var name = prompt(__('Provide a name'));
      var model = new models[me.options.type.substring(0, me.options.type.length - 1)]({
        name: name,
        token: window.user.get('token')
      });
      model.args.project = me.model.get('_id');
      model.save().done(function(response) {
        me.model.get(me.options.type.toLowerCase()).push(response);
        me.initialize();
      });
    },
    onUpdate: function(e) {
      var me = this;
      var target = me.$(e.currentTarget);
      var name = prompt(__('Provide a new name'));
      var model = new models[me.options.type.substring(0, me.options.type.length - 1)]({
        name: name,
        token: window.user.get('token'),
        id: target.data('id')
      });
      model.args.project = me.model.get('_id');
      model.save().done(function(response) {
        console.log(response);
        /*me.model.get(me.options.type.toLowerCase()).push(response);
        me.initialize();*/
      });
    }
  });

})(projects);