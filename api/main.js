var app = require('./config').app;

app.get('/api/', function(request, response) {
  return response.send('¡Bienvenido al api de bugbucket!');
});

app.listen(4444);
