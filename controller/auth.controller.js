const db = require('../db');

module.exports.login = (req, res) => {
  res.render('auth/login', {
    errors: []
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
      ]
    })
    return;
  }
  console.log(user);
  if (password !== user.password) {
    res.render('auth/login', {
      errors: [
        "Wrong password"
      ]
    })
    return;
  }
  
  res.cookie('userId', user.id);
  res.redirect('/user');
}