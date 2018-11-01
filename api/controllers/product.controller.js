var Product = require('../../models/product.model');
module.exports.index = async (req, res, next) => {
  var products = await Product.find();
  res.json(products);
}