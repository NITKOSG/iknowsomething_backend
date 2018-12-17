import mongoose from 'mongoose';

const BlogSchema = mongoose.Schema({

  userId: {
    type: String,
    required: true,
  },

  blogTitle: {
    type: String,
    required: true,
  },

  blogContent: {
    type: String,
    required: true,
  },

  reactions: [{
    reactionType: {
      type: String,
      required: true,
    },
    count: {
      type: String,
      required: true,
    },
  }],

  comments: [{
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  }],

  created_at: {
    type: Date,
    default: new Date(),
  },

});

export default mongoose.model('Blog', BlogSchema);
