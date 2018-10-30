var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
  name: String,
  image: String,
  description: String
})

var Product = mongoose.model('product', productSchema, 'products');

module.exports = Product;