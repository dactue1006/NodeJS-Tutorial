require('dotenv').config();
console.log(process.env.SESSION_SECRET);

const express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

const userRoutes = require('./routes/user.route');
const authRoutes = require('./routes/auth.route');
const productRoutes = require('./routes/product.router');

const db = require('./db');

const app = new express();
const port = 8000;

// Set some defaults (required if your JSON file is empty)
db.defaults({ user: [] })
  .write()

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET))


app.use(express.static('public'));
  
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (request, response)=>{
  response.render('home', { 
    title: 'hello express', 
    link: '/user',
    user: null
  });
})

app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/products', productRoutes);

app.listen(port, () => {
  console.log('Server is running on port 8000');
})