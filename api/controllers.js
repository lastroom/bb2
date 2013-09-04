var willy = require('./willy'),
    models = require('./models');

var rand = function() {
  return Math.random().toString(36).substr(2);
};

var token = function() {
  return rand();
};

var isAuthenticated = function(request, response, callback) {
  if (request.args['token'] == undefined) return response.status(400).send({'message': 'Token required'});
  models.User.findOne({
    token: request.args.token
  }, function(err, model) {
    if (err) return response.status(400).send(err);
    if (model == null) return response.status(400).send({'message': 'Not found'});
    callback(model);
  })
}

module.exports.UsersController = willy.Controller.extend({
  read: function(request, response) {
    models.User.find(function(err, collection) {
      return response.send(collection);
    });
  },
  create: function(request, response) {
    var use = null;
    request.args['password'] = willy.sha1(request.args.password);
    request.args['token'] = token();
    user = new models.User(request.args);
    user.save(function(err, model) {
      if (err) return response.status(400).send(err);
      return response.send(model);
    });
  }
});

module.exports.UserController = willy.Controller.extend({
  read: function(request, response) {
    models.User.findById(request.params.id, function(err, model) {
      return response.send(model);
    });
  },
  update: function(request, response) {
    return response.send('Update');
  },
  destroy: function(request, response) {
    return response.send('Destroy');
  }
});

module.exports.AuthenticationController = willy.Controller.extend({
  create: function(request, response) {
    var password = willy.sha1(request.args.password);
    user = models.User.findOne({
      email: request.args.email,
      password: password,
      active: true
    }, function(err, model) {
      if (err) return response.status(400).send(err);
      if (model == null) return response.status(404).send({'message': 'Not found'});
      return response.send(model);
    });
  }
});

module.exports.ProjectsController = willy.Controller.extend({
  read: function(request, response) {
    isAuthenticated(request, response, function(user) {
      models.Project.find({
        'admins._id': user._id
      }, function(err, collection) {
        if (err) return response.status(400).send(err);
        if (collection == null) return response.status(404).send({'message': 'Not found'});
        return response.send(collection);
      });
    });
  },
  create: function(request, response) {
    isAuthenticated(request, response, function(user) {
      request.args.admins = [user];
      var project = new models.Project(request.args);
      project.save(function(err, model) {
        if (err) return response.status(400).send(err);
        return response.send(model);
      });
    });
  }
});

module.exports.ProjectController = willy.Controller.extend({
  read: function(request, response) {
    isAuthenticated(request, response, function(user) {
      var project = null;
      models.Project.findById(request.params.id, function(err, model) {
        if (err) return response.status(400).send(err);
        if (model == null) return response.status(404).send({'message': 'Not found'});
        project = model;
        models.Issue.find({
          project: request.params.id
        }, function(err, collection) {
          if (err) return response.status(400).send(err);
          if (collection == null) return response.status(404).send({'message': 'Not found'});
          project.issues = collection;
          return response.send(project);
        });
      });
    });
  },
  create: function(request, response) {
    isAuthenticated(request, function(user) {

    });
  }
});

module.exports.MilestonesController = willy.Controller.extend({
  create: function(request, response) {
    isAuthenticated(request, response, function(user) {
      models.Project.findById(request.params.id, function(err, project) {
        if (err) return response.status(400).send(err);
        if (project == null) return response.status(404).send({'message': 'Not found'});
        var milestone = new models.Milestone(request.args);
        milestone.save(function(err, milestone) {
          if (err) return response.status(400).send(err);
          project.milestones.push(milestone);
          project.save(function() {
            return response.send(milestone);
          });
        });
      });
    });
  }
});

module.exports.VersionsController = willy.Controller.extend({
  create: function(request, response) {
    isAuthenticated(request, response, function(user) {
      models.Project.findById(request.params.id, function(err, project) {
        if (err) return response.status(400).send(err);
        if (project == null) return response.status(404).send({'message': 'Not found'});
        var version = new models.Version(request.args);
        version.save(function(err, version) {
          if (err) return response.status(400).send(err);
          project.versions.push(version);
          project.save(function() {
            return response.send(version);
          });
        });
      });
    });
  }
});

module.exports.ComponentsController = willy.Controller.extend({
  create: function(request, response) {
    isAuthenticated(request, response, function(user) {
      models.Project.findById(request.params.id, function(err, project) {
        if (err) return response.status(400).send(err);
        if (project == null) return response.status(404).send({'message': 'Not found'});
        var component = new models.Component(request.args);
        component.save(function(err, component) {
          if (err) return response.status(400).send(err);
          project.components.push(component);
          project.save(function() {
            return response.send(component);
          });
        });
      });
    });
  }
});

module.exports.MilestoneController = willy.Controller.extend({
  update: function(request, response) {
    console.log('update');
    isAuthenticated(request, response, function(user) {
      models.Projects.findById(request.params.id, function(err, project) {
        if (err) return response.status(400).send(err);
        if (project == null) return response.status(404).send({'message': 'Not found'});
        project.milestones.findById(request.params.milestone, function(err, milestone) {
          milestone.name = request.args.name;
          milestone.save(function(err, model) {
            if (err) return response.status(400).send(err);
            return response.send(model);
          });
        });
      });
    });
  }
});

module.exports.VersionController = willy.Controller.extend({
  update: function(request, response) {
    console.log('update');
    isAuthenticated(request, response, function(user) {
      models.Projects.findById(request.params.id, function(err, project) {
        if (err) return response.status(400).send(err);
        if (project == null) return response.status(404).send({'message': 'Not found'});
        project.versions.findById(request.params.version, function(err, version) {
          version.name = request.args.name;
          version.save(function(err, model) {
            if (err) return response.status(400).send(err);
            return response.send(model);
          })
        });
      });
    });
  }
});

module.exports.ComponentController = willy.Controller.extend({
  update: function(request, response) {
    console.log('update');
    isAuthenticated(request, response, function(user) {
      models.Projects.findById(request.params.id, function(err, project) {
        if (err) return response.status(400).send(err);
        if (project == null) return response.status(404).send({'message': 'Not found'});
        project.components.findById(request.params.component, function(err, component) {
          component.name = request.args.name;
          component.save(function(err, model) {
            if (err) return response.status(400).send(err);
            return response.send(model);
          });
        });
      });
    });
  }
});
