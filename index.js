const express = require('express');
const app = new express();

const port = 8000;
const users = [
  { id: 1, name:'nguyen van a'},
  { id: 2, name: 'nguyen b' }, 
  { id: 3, name: 'nguyen c' }
];
  
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (request, response)=>{
  response.render('home', { title: 'hello express', link: '/user'});
})

app.get('/user', (req, res) => {
  res.render('user', { 
    data: users,
    preText: ''
  });
})

app.get('/user/search', (req, res) => {
  let q = req.query.q;
  console.log(q);
  let matchUsers = users.filter( (user)=>{
    return user.name.indexOf(q) !== -1;
  })
  res.render('user', {
    data: matchUsers,
    preText: String(q)
  })
  //console.log(req.query);
})

app.listen(port, () => {
  console.log('Server is running on port 8000');
})