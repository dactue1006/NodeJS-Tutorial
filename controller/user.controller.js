const db = require('../db');
const shortid = require('shortid');

module.exports.index = (req, res) => {
  res.render('user/index', { 
    data: db.get('user').value(),
    preText: '',
    user: null,
  });
}

module.exports.search = (req, res) => {
  let q = req.query.search;
  console.log(q);
  let matchUsers = db.get('user').value().filter( (user)=>{
    return user.name.indexOf(q) !== -1;
  })
  res.render('user/index', {
    data: matchUsers,
    preText: String(q),
    user: null,
  })
  //console.log(req.query);
}

module.exports.create = (req, res) => {
  console.log(req.cookies);
  let id = (req.cookies);
  let user = db.get('user').find({ id: id }).value();
  res.render('user/create', {
    errors: [],
    value: null,
    user: user,
  });
}

module.exports.postCreate =  (req, res) => {
  req.body.id = shortid.generate();
  req.body.avatar = req.file.path.split('\\').slice(1).join('/');
  console.log(req.body.avatar);
  db.get('user').push(req.body).write();
  res.redirect('/user');
}

module.exports.get = (req, res) => {
  let id = (req.params.id);
  let user = db.get('user').find({ id: id }).value();
  res.render('user/view', { user: user});
}