var willy = require('./willy');
var controllers = require('./controllers');

var app = new willy.App({
  database: {
    engine: 'mongodb',
    name: 'bb2',
    host: 'localhost',
    port: '',
    password: ''
  }
});

app.configure(function() {
  var express = require('express');
  
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.url("/users", controllers.UsersController);
app.url("/users/:id", controllers.UserController);
app.url("/authenticate", controllers.AuthenticationController);
app.url("/projects", controllers.ProjectsController);
app.url("/projects/:id", controllers.ProjectController);
app.url("/projects/:id/components", controllers.ComponentsController);
app.url("/projects/:id/components/:component", controllers.ComponentController);
app.url("/projects/:id/versions", controllers.VersionsController);
app.url("/projects/:id/versions/:version", controllers.VersionController);
app.url("/projects/:id/milestones", controllers.MilestonesController);
app.url("/projects/:id/milestones/:milestone", controllers.MilestoneController);
app.url("/projects/:id/issues", controllers.IssuesController);
app.url("/projects/:project/issues/:id", controllers.IssueController);

app.listen(4444);
