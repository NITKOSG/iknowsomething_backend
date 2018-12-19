import mongoose from 'mongoose';

const BlogSchema = mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  blogTitle: {
    type: String,
    required: true,
  },

  blogContent: {
    type: String,
    required: true,
  },

  likes: [{
    count: {
      type: Number,
      default: 0,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  }],

  comments: [{
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    timestamp: {
      type: Date,
      default: new Date(),
    },
  }],

  created_at: {
    type: Date,
    default: new Date(),
  },

});

export default mongoose.model('Blog', BlogSchema);
