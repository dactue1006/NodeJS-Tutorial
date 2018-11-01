require('dotenv').config();
console.log(process.env.SESSION_SECRET);

const express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csurf = require('csurf')
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);

const userRoutes = require('./routes/user.route');
const authRoutes = require('./routes/auth.route');
const productRoutes = require('./routes/product.router');
const cartRoutes = require('./routes/cart.route');
const transferRoutes = require('./routes/transfer.route');

const authMiddleware = require('./middleware/auth.middleware');
const sessionMiddleware = require('./middleware/session.middleware');

const apiProductRoute = require('./api/routes/product.route');

const db = require('./db');

const app = new express();
const port = 8000;

// Set some defaults (required if your JSON file is empty)
db.defaults({ user: [] })
  .write()

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET))
app.use(csurf({ cookie: true }))

app.use(sessionMiddleware);

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

app.use('/user', authMiddleware.requireAuth, userRoutes);
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/transfer', authMiddleware.requireAuth, transferRoutes);
app.use('/api/products', apiProductRoute);

app.listen(port, () => {
  console.log('Server is running on port 8000');
})