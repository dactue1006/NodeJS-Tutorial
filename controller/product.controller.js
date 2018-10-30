var Product = require('../models/product.model');
module.exports.index = async (req, res, next) => {
  // let page = parseInt(req.query.page) || 1;
  // console.log(req.query);
  // let itemPerPage = 6;
  // let start = (page-1) * itemPerPage,
  //     end = page * itemPerPage;
  // res.render('products/index', {
  //   user: null,
  //   //products: db.get('products').value().slice(start, end),
  //   products: db.get('products').drop(end).take(itemPerPage).value(),
  // })
  var products = await Product.find();
  res.render('products/index', {
    user: null,
    products: products
  })
}