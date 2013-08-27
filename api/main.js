var app = require('./config').app;

var models = require('./models').models;

app.get('/api', function(request, response) {
  /*var product = new models.Product({
    title: 'Ejemplo1'
  });
  product.save(function(err) {
    if (!err) {
      console.log('created');
      return false;
    }
    console.log('error:', err);
  });*/
  return response.send('Hola mundo!');
});

app.get('')



app.listen(4444);
