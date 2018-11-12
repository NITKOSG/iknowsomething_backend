// This is the schema that would be followed
import mongooge from 'mongoose';

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
export default User;
