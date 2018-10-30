const db = require('../db');
const md5 = require('md5');

module.exports.login = (req, res) => {
  res.render('auth/login', {
    errors: [],
    user: null
  });
}

module.exports.postLogin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  let user = db.get('user').find({ email: email }).value();
  
  if (!user) {
    res.render('auth/login', {
      errors: [
        "user doesn't exist"
      ],
      user: null
    })
    return;
  }
  if (md5(password) !== user.password) {
    res.render('auth/login', {
      errors: [
        "Wrong password"
      ],
      user: null
    })
    return;
  }
  
  res.cookie('userId', user.id, {
    signed: true
  });
  res.redirect('/user');
}