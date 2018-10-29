const db = require('../db');

module.exports.addToCart = (req, res, next) => {
  const productId = req.params.productId;
  const sessionId = req.signedCookies.sessionId;

  if (!sessionId) {
    res.redirect('/products');
    return ;
  }
  let count = db.get('session')
                .find({ id: sessionId })
                .get("cart." + productId)
                .value() || 0;
  db.get('session')
    .find({ id: sessionId })
    .set("cart." + productId, count+1)
    .write();
  res.redirect('/products');
}