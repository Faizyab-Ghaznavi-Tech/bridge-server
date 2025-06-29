import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: true
  },
  abstract: {
    type: String,
    required: true,
    maxlength: 1000
  },
  keywords: [{
    type: String,
    trim: true
  }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  rejectionReason: {
    type: String,
    default: ''
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedAt: {
    type: Date
  },
  category: {
    type: String,
    required: true,
    enum: ['Education Technology', 'Curriculum Development', 'Teaching Methods', 'Student Assessment', 'Educational Psychology', 'Special Education', 'Higher Education', 'Early Childhood Education', 'Other']
  },
  readTime: {
    type: Number, // in minutes
    default: 5
  },
  views: {
    type: Number,
    default: 0
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

// Calculate read time based on content
articleSchema.pre('save', function(next) {
  if (this.isModified('content')) {
    const wordsPerMinute = 200;
    const wordCount = this.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    this.readTime = Math.ceil(wordCount / wordsPerMinute) || 1;
  }
  next();
});

const Article = mongoose.model('Article', articleSchema);

// Delete articles by author
export const deleteArticlesByAuthor = async (userId) => {
  await Article.deleteMany({ author: userId });
};

export default Article;