var app = require('./config').app;
var controllers = require('./controllers');

app.url("/users", controllers.UsersController);

app.listen(4444);
