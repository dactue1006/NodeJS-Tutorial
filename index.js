const express = require('express');
const app = new express();

const port = 8000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (request, response)=>{
  response.render('home', { title: 'hello express', link: '/user'});
})

app.get('/user', (req, res) => {
  res.send('user list');
})
app.listen(port, () => {
  console.log('Server is running on port 8000');
})