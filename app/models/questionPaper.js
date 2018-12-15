import mongoose from 'mongoose';

const QuestionPaperSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
});

export default mongoose.model('QuestionPaper', QuestionPaperSchema);
