(function(namespace) {

  var models = namespace.models;
  var collections = namespace.collections;

  //TODO: Add collections below
  collections.Projects = Bb.Collection.extend({
    model: models.Project,
    url: function() {
      return uri('projects') + this.getParamsQuery();
    }
  });

  collections.Issues = Bb.Collection.extend({
    model: models.Issue,
    args: {},
    url: function() {
      return uri('projects', this.args.project, 'issues') + this.getParamsQuery();
    }
  })
    
})(projects);