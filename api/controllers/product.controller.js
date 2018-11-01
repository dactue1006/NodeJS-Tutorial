var Product = require('../../models/product.model');
module.exports.index = async (req, res, next) => {
  var products = await Product.find();
  res.json(products);
}

module.exports.create = async (req, res, next) => {
  var products = await Product.create(req.body);
  res.json(products);
}