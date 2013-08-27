var mongoose = require('mongoose');
var validators = require('./validators');

var Schema = mongoose.Schema;

var schemes = {};
 
schemes.Product = new Schema({
    title: { type: String, required: true }
});

//schemes.Product.path('title').validate(validators.product.titleValidation);

var models = {};

models.Product  = mongoose.model('Product', schemes.Product);

module.exports.schemes = schemes;
module.exports.models = models;
