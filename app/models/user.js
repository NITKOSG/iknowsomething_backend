import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  picture: String,

  blogIds: {
    type: Array,
  },

  onboard: {
    type: Boolean,
    default: false,
  },

  username: {
    type: String,
    unique: true,
  },

  phone: {
    type: Number,
  },

  rollNo: {
    type: Number,
  },

  course: {
    type: String,
  },

  branch: {
    type: String,
  },

  dateOfBirth: {
    type: Date,
  },

  created_at: {
    type: Date,
    default: new Date(),
  },

  updated_at: {
    type: Date,
    default: new Date(),
  },

});

export default mongoose.model('User', UserSchema);
