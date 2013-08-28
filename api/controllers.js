var willy = require('./willy');
var models = require('./models');

module.exports.UsersController = willy.BaseController.extend({
  create: function(options) {
    var user = new models.User(options.data);
    user.save(function(err) {
      if(err) {
        console.log(err);
        return;
      }
      options.response.send(options.data);
    });
  }
});
