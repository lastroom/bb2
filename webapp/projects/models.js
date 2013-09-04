(function(namespace) {

  var models = namespace.models;

  //TODO: Add models below
  models.Project = Bb.Model.extend({
    url: function() {
      if (this.id) {
        return uri('projects', this.id) + this.getParamsQuery();
      }
      return uri('projects');
    }
  });

  models.Issue = Bb.Model.extend({
    url: function() {
      return uri('issues');
    }
  });

  models.Milestone = Bb.Model.extend({
    args: {},
    url: function() {
      if (this.id) {
        return uri('projects', this.args.project, 'milestones', this.id);
      }
      return uri('projects', this.args.project, 'milestones');
    }
  });

  models.Version = Bb.Model.extend({
    args: {},
    url: function() {
      if (this.id) {
        return uri('projects', this.args.project, 'versions', this.id);
      }
      return uri('projects', this.args.project, 'versions');
    }
  });

  models.Component = Bb.Model.extend({
    args: {},
    url: function() {
      if (this.id) {
        return uri('projects', this.args.project, 'components', this.id);
      }
      return uri('projects', this.args.project, 'components');
    }
  });
    
})(projects);