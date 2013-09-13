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

  views.CreateProject = Bb.View.extend({
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

  views.Issues = Bb.View.extend({
    template: getTemplate('issues'),
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
      var issues = new collections.Issues();
      issues.args.project = me.options.project;
      issues.addParam('token', window.user.get('token'));
      $.when(
        project.fetch(),
        issues.fetch()
      ).done(function() {
        project.set('issues', issues.toJSON());
        me.$el.html(me.template(project.toJSON()));
      });
      return me;
    }
  });

  views.CreateIssue = Bb.View.extend({
    template: getTemplate('create-issue'),
    events: {
      'submit': 'onCreate'
    },
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
    },
    onCreate: function(e) {
      e.stopPropagation();
      e.preventDefault();
      var me = this;
      var data = formToJSON(me.$('form'));
      data['token'] = window.user.get('token');
      var issue = new models.Issue(data);
      issue.args.project = me.options.project;
      issue.save().done(function() {
        Backbone.history.navigate('#projects/' + me.options.project, {trigger: true}, {replace: true});
      });
      return false;
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
      me.$('.local-container').off();
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
      'click .edit': 'onUpdate',
      'click .delete': 'onDestroy'
    },
    initialize: function() {
      var me = this;
      me.model.set('list', me.model.get(me.options.type.toLowerCase()));
      me.render();
    },
    render: function() {
      var me = this;
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
        var list = me.model.get(me.options.type.toLowerCase());
        for(var i in list) {
          if (target.data('id') == list[i]._id) {
            list[i].name = name;
          }
        }
        me.initialize();
      });
    },
    onDestroy: function(e) {
      var me = this;
      var target = me.$(e.currentTarget);
      var model = new models[me.options.type.substring(0, me.options.type.length - 1)]({
        id: target.data('id')
      });
      model.args.project = me.model.get('_id');
      model.addParam('token', window.user.get('token'));
      model.destroy().done(function(response) {
        var list = me.model.get(me.options.type.toLowerCase());
        for(var i in list) {
          if (target.data('id') == list[i]._id) {
            list.splice(i, 1);
          }
        }
        me.initialize();
      });
    }
  });

})(projects);