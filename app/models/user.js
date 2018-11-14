// This is the schema that would be followed
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullName: String,
  userName: String,
  email: String,
  googleId: String,
  facebookId: String,
  gender: String
});

const User = mongoose.model('user', UserSchema);
export default User;
