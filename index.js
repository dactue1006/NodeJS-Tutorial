const express = require('express');
const app = new express();
var bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const shortid = require('shortid');

// Set some defaults (required if your JSON file is empty)
db.defaults({ user: [] })
  .write()


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const port = 8000;
  
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (request, response)=>{
  response.render('home', { title: 'hello express', link: '/user'});
})

app.get('/user', (req, res) => {
  res.render('user/index', { 
    data: db.get('user').value(),
    preText: ''
  });
})

app.get('/user/search', (req, res) => {
  let q = req.query.search;
  console.log(q);
  let matchUsers = db.get('user').value().filter( (user)=>{
    return user.name.indexOf(q) !== -1;
  })
  res.render('user/index', {
    data: matchUsers,
    preText: String(q)
  })
  //console.log(req.query);
})

app.get('/user/create', (req, res) => {
  res.render('user/create');
})

app.post('/user/create', (req, res) => {
  req.body.id = shortid.generate();
  db.get('user').push(req.body).write();
  res.redirect('/user');
})

app.get('/user/:id', (req, res) => {
  let id = (req.params.id);
  console.log(typeof id);
  let user = db.get('user').find({ id: id }).value();
  console.log(user);
  res.render('user/view', { user: user});
})

app.listen(port, () => {
  console.log('Server is running on port 8000');
})