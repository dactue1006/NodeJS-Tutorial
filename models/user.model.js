var mogoose = require('mongoose');

var userSchema = mongoose.Schema({
  email: String,
  password: String,
  name: String,
  avatar: String,
  phone: String,
})

var User = mongoose.model('user', userSchema, 'users');

module.exports = User;