var app = require('./config').app;
var models = require('./models');
var willy = require('./willy');
var _ = require('underscore');

app.get('/', function(request, response) {
  response = willy.setCORS(response);
  return response.send('¡Bienvenido al api de bugbucket!');
});

app.get('/users', function(request, response) {
  response = willy.setCORS(response);
  return response.send('get users');
});

app.get('/users/:id', function(request, response) {
  response = willy.setCORS(response);
  return response.send('get: ' + request.params.id);
});

var BaseController = {
  precreate: function(request, response) {
    willy.setCORS(response);
    if (this["create"]) {
      var data = JSON.parse(request.body.model);
      this["create"]({
        data: data,
        request: request, 
        response: response,
      });
    }
  }
};

var UserController = _.extend({
  create: function(options) {
    var user = new models.User(options.data);
    user.save(function(err) {
      if(err) {
        console.log(err);
        return;
      }
      options.response.send(JSON.stringify(options.data));
    });
  },
  update: function() {

  },
  read: function() {

  },
  destroy: function() {

  },
}, BaseController);

var url = function(resourceUri, controller) {
  var verbs = {
    'create': 'post'
  };
  for(var handler in verbs) {
    var method = verbs[handler];
    if (controller[handler]) {
      app[method](resourceUri, _.bind(controller["pre" + handler], controller));
    }
  }
};

url("/users", UserController);

app.put('/users/:id', function(request, response) {
  response = willy.setCORS(response);
  return response.send('put: ' + request.params.id);
});

app.delete('/users/:id', function(request, response) {
  response = willy.setCORS(response);
  return response.send('delete: ' + request.params.id);
});

app.get('/projects', function(request, response) {
  response = willy.setCORS(response);
  return response.send('get projects');
});

app.get('/projects/:id', function(request, response) {
  response = willy.setCORS(response);
  return response.send('get: ' + request.params.id);
});

app.post('/projects', function(request, response) {
  response = willy.setCORS(response);
  return response.send('post project');
});

app.put('/projects/:id', function(request, response) {
  response = willy.setCORS(response);
  return response.send('put: ' + request.params.id);
});

app.delete('/projects/:id', function(request, response) {
  return response.send('delete: ' + request.params.id);
});

app.get('/versions', function(request, response) {
  return response.send('get versions');
});

app.get('/versions/:id', function(request, response) {
  return response.send('get: ' + request.params.id);
});

app.post('/versions', function(request, response) {
  return response.send('post version');
});

app.put('/versions/:id', function(request, response) {
  return response.send('put: ' + request.params.id);
});

app.delete('/versions/:id', function(request, response) {
  return response.send('delete: ' + request.params.id);
});

app.get('/milestones', function(request, response) {
  return response.send('get milestones');
});

app.get('/milestones/:id', function(request, response) {
  return response.send('get: ' + request.params.id);
});

app.post('/milestones', function(request, response) {
  return response.send('post milestone');
});

app.put('/milestones/:id', function(request, response) {
  return response.send('put: ' + request.params.id);
});

app.delete('/milestones/:id', function(request, response) {
  return response.send('delete: ' + request.params.id);
});

app.get('/components', function(request, response) {
  return response.send('get components');
});

app.get('/components/:id', function(request, response) {
  return response.send('get: ' + request.params.id);
});

app.post('/components', function(request, response) {
  return response.send('post component');
});

app.put('/components/:id', function(request, response) {
  return response.send('put: ' + request.params.id);
});

app.delete('/components/:id', function(request, response) {
  return response.send('delete: ' + request.params.id);
});

app.get('/issues', function(request, response) {
  return response.send('get issues');
});

app.get('/issues/:id', function(request, response) {
  return response.send('get: ' + request.params.id);
});

app.post('/issues', function(request, response) {
  return response.send('post issue');
});

app.put('/issues/:id', function(request, response) {
  return response.send('put: ' + request.params.id);
});

app.delete('/issues/:id', function(request, response) {
  return response.send('delete: ' + request.params.id);
});

app.get('/kinds', function(request, response) {
  return response.send('get kinds');
});

app.get('/kinds/:id', function(request, response) {
  return response.send('get: ' + request.params.id);
});

app.post('/kinds', function(request, response) {
  return response.send('post kind');
});

app.put('/kinds/:id', function(request, response) {
  return response.send('put: ' + request.params.id);
});

app.delete('/kinds/:id', function(request, response) {
  return response.send('delete: ' + request.params.id);
});

app.get('/status', function(request, response) {
  return response.send('get status');
});

app.get('/status/:id', function(request, response) {
  return response.send('get: ' + request.params.id);
});

app.post('/status', function(request, response) {
  return response.send('post status');
});

app.put('/status/:id', function(request, response) {
  return response.send('put: ' + request.params.id);
});

app.delete('/status/:id', function(request, response) {
  return response.send('delete: ' + request.params.id);
});

app.get('/priorities', function(request, response) {
  return response.send('get priorities');
});

app.get('/priorities/:id', function(request, response) {
  return response.send('get: ' + request.params.id);
});

app.post('/priorities/status', function(request, response) {
  return response.send('post priority');
});

app.put('/priorities/:id', function(request, response) {
  return response.send('put: ' + request.params.id);
});

app.delete('/priorities/:id', function(request, response) {
  return response.send('delete: ' + request.params.id);
});

app.listen(4444);
