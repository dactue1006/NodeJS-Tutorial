const db = require('../db');

module.exports.postCreate = (req, res, next) => {
  let errors = [];
  if (!req.body.name) {
    errors.push("Name is required");
  }
  if (!req.body.phone) {
    errors.push("Phone is required");
  }

  if (errors.length) {
    console.log(errors);
    res.render('user/create', {
      errors: errors,
      value: req.body
    })
  }
  res.locals.success = true;
  next();
}