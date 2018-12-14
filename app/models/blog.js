import mongoose from 'mongoose';

const BlogSchema = mongoose.Schema({

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
