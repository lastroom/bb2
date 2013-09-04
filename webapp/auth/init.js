(function() {

  namespace("auth");

  auth.models.UserModel = Backbone.Model.extend({
    defaults: {
      empty: true
    },
    loginURL: '',
    registerURL: '',
    initialize: function() {
      var me = this;
      me.on('change', me.onChange);
    },
    onChange: function() {
      var me = this;
      me.attributes.empty = false;
      var storageEngine = App.pkg.settings.storage_engine;
      var name = App.pkg._id;
      window[storageEngine][name + '-session'] = JSON.stringify(me.toJSON());
    },
    login: function() {
      var me = this;
      $.post(
        me.loginURL,
        me.toJSON(),
        function(out) {
          me.set(out);
          var home = App.pkg.settings.home_route || "#home";
          Backbone.history.navigate(home, {trigger: true}, {replace: true});
        },
        'json'
      ).error(function() {
        me.logout();
      });
    },
    register: function() {
      var me = this;
      $.post(
        me.registerURL,
        me.toJSON(),
        function(out) {
          me.set(out);
          var home = App.pkg.settings.home_route || "#home";
          Backbone.history.navigate(home, {trigger: true}, {replace: true});
        },
        'json'
      );
    },
    logout: function() {
      var me = this;
      me.clear();
      me.attributes.empty = true;
      var storageEngine = App.pkg.settings.storage_engine;
      var name = App.pkg._id;
      delete window[storageEngine][name + '-session'];
    }
  });

})();
