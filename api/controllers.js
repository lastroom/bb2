var willy = require('./willy'),
    models = require('./models'),
    _ = require('underscore');

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
        'admins': { $in: [user._id] }
      }, function(err, collection) {
        if (err) return response.status(400).send(err);
        if (collection == null) return response.status(404).send({'message': 'Not found'});
        return response.send(collection);
      });
    });
  },
  create: function(request, response) {
    isAuthenticated(request, response, function(user) {
      request.args.admins = [user._id];
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
      models.Project.findById(request.params.id).populate('admins').populate('writers').exec(function(err, project) {
        if (err) return response.status(400).send(err);
        if (project == null) return response.status(404).send({'message': 'Not found'});
        var p = {};
        _.extend(p, JSON.parse(JSON.stringify(project)));
        p['users'] = _.union(project.admins, project.writers);
        return response.send(p);
      });
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
        project.milestones.push(milestone);
        project.save(function(err, project) {
          if (err) return response.status(400).send(err);
          return response.send(milestone);
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
        project.versions.push(version);
        project.save(function(err, project) {
          if (err) return response.status(400).send(err);
          return response.send(version);
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
        project.components.push(component);
        project.save(function(err, project) {
          if (err) return response.status(400).send(err);
          return response.send(component);
        });
      });
    });
  }
});

module.exports.MilestoneController = willy.Controller.extend({
  update: function(request, response) {
    isAuthenticated(request, response, function(user) {
      models.Project.findOne({
        '_id': request.params.id,
        'admins': { $in: [user._id] }
      }, function(err, project) {
        if (err) return response.status(400).send(err);
        if (project == null) return response.status(404).send({'message': 'Not found'});
        project.milestones.id(request.params.milestone).name = request.args.name;
        project.save(function(err, project) {
          if (err) response.status(400).send(err);
          response.send(project.milestones);
        });
      });
    });
  },
  destroy: function(request, response) {
    isAuthenticated(request, response, function(user) {
      models.Project.findOne({
        '_id': request.params.id,
        'admins': { $in: [user._id] }
      }, function(err, project) {
        if (err) return response.status(400).send(err);
        if (project == null) return response.status(404).send({'message': 'Not found'});
        project.milestones.id(request.params.milestone).remove();
        project.save(function(err, project) {
          if (err) response.status(400).send(err);
          response.send(project.milestones);
        });
      });
    });
  }
});

module.exports.VersionController = willy.Controller.extend({
  update: function(request, response) {
    isAuthenticated(request, response, function(user) {
      models.Project.findOne({
        '_id': request.params.id,
        'admins': { $in: [user._id] }
      }, function(err, project) {
        if (err) return response.status(400).send(err);
        if (project == null) return response.status(404).send({'message': 'Not found'});
        project.versions.id(request.params.version).name = request.args.name;
        project.save(function(err, project) {
          if (err) response.status(400).send(err);
          response.send(project.versions);
        });
      });
    });
  },
  destroy: function(request, response) {
    isAuthenticated(request, response, function(user) {
      models.Project.findOne({
        '_id': request.params.id,
        'admins': { $in: [user._id] }
      }, function(err, project) {
        if (err) return response.status(400).send(err);
        if (project == null) return response.status(404).send({'message': 'Not found'});
        project.versions.id(request.params.version).remove();
        project.save(function(err, project) {
          if (err) response.status(400).send(err);
          response.send(project.versions);
        });
      });
    });
  }
});

module.exports.ComponentController = willy.Controller.extend({
  update: function(request, response) {
    isAuthenticated(request, response, function(user) {
      models.Project.findOne({
        '_id': request.params.id,
        'admins': { $in: [user._id] }
      }, function(err, project) {
        if (err) return response.status(400).send(err);
        if (project == null) return response.status(404).send({'message': 'Not found'});
        project.components.id(request.params.component).name = request.args.name;
        project.save(function(err, project) {
          if (err) response.status(400).send(err);
          response.send(project.components);
        });
      });
    });
  },
  destroy: function(request, response) {
    isAuthenticated(request, response, function(user) {
      models.Project.findOne({
        '_id': request.params.id,
        'admins': { $in: [user._id] }
      }, function(err, project) {
        if (err) return response.status(400).send(err);
        if (project == null) return response.status(404).send({'message': 'Not found'});
        project.components.id(request.params.component).remove();
        project.save(function(err, project) {
          if (err) response.status(400).send(err);
          response.send(project.components);
        });
      });
    });
  }
});

module.exports.IssuesController = willy.Controller.extend({
  read: function(request, response) {
    models.Project.findById(request.params.id, function(err, project) {
      if (err) return response.status(400).send(err);
      if (project == null) return response.status(404).send({'message': 'Not found'});
      models.Issue.find({'project': request.params.id}, function(err, issues) {
        if (err) return response.status(400).send(err);
        if (issues == null) return response.status(404).send({'message': 'Not found'});
        return response.send(issues);
      });
    });
  },
  create: function(request, response) {
    isAuthenticated(request, response, function(user) {
      models.Project.findBy(request.params.id, function(err, project) {
        if (err) return response.status(400).send(err);
        if (project == null) return response.status(404).send({'message': 'Not found'});
        var issue = new models.Issue(request.args);
        issue.save(function(err, issue) {
          if (err) return response.status(400).send(err);
          return response.send(issue);
        });
      });
    });
  }
});
