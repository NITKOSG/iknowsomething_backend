// This is the schema that would be followed
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userschema = new Schema({
  fullName: String,
  userName: String,
  email: String,
  googleId: String,
  facebookId: String,
  gender: String
});

const User = mongoose.model('user', userschema);

module.exports = User;
