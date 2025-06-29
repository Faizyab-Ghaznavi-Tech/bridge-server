import express from 'express';
import Article from '../models/Article.js';
import User from '../models/User.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all approved articles (public)
router.get('/', async (req, res) => {
  try {
    const { category, search, page = 1, limit = 10 } = req.query;
    const query = { status: 'approved' };

    if (category && category !== 'all') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { abstract: { $regex: search, $options: 'i' } },
        { keywords: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const articles = await Article.find(query)
      .populate('author', 'username institution')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Article.countDocuments(query);

    res.json({
      articles,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    console.error('Get articles error:', error);
    res.status(500).json({ message: 'Failed to fetch articles' });
  }
});

// Get single article
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate('author', 'username institution bio');

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Only show approved articles to non-authors
    if (article.status !== 'approved' && (!req.user || req.user._id.toString() !== article.author._id.toString())) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Increment views
    article.views += 1;
    await article.save();

    res.json(article);
  } catch (error) {
    console.error('Get article error:', error);
    res.status(500).json({ message: 'Failed to fetch article' });
  }
});

// Get user's articles
router.get('/user/mine', authenticateToken, async (req, res) => {
  try {
    const articles = await Article.find({ author: req.user._id })
      .populate('author', 'username institution')
      .sort({ createdAt: -1 });

    res.json(articles);
  } catch (error) {
    console.error('Get user articles error:', error);
    res.status(500).json({ message: 'Failed to fetch your articles' });
  }
});

// Get pending articles (admin only)
router.get('/admin/pending', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const articles = await Article.find({ status: 'pending' })
      .populate('author', 'username email institution')
      .sort({ createdAt: -1 });

    res.json(articles);
  } catch (error) {
    console.error('Get pending articles error:', error);
    res.status(500).json({ message: 'Failed to fetch pending articles' });
  }
});

// Submit new article
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, content, abstract, keywords, category } = req.body;

    const article = new Article({
      title,
      content,
      abstract,
      keywords: keywords || [],
      category,
      author: req.user._id
    });

    await article.save();
    await article.populate('author', 'username institution');

    res.status(201).json({
      message: 'Article submitted successfully! It will be reviewed by administrators.',
      article
    });
  } catch (error) {
    console.error('Submit article error:', error);
    res.status(500).json({ message: 'Failed to submit article' });
  }
});

// Approve article (admin only)
router.put('/:id/approve', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      {
        status: 'approved',
        approvedBy: req.user._id,
        approvedAt: new Date(),
        rejectionReason: ''
      },
      { new: true }
    ).populate('author', 'username email');

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json({
      message: 'Article approved successfully',
      article
    });
  } catch (error) {
    console.error('Approve article error:', error);
    res.status(500).json({ message: 'Failed to approve article' });
  }
});

// Reject article (admin only)
router.put('/:id/reject', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { reason } = req.body;

    const article = await Article.findByIdAndUpdate(
      req.params.id,
      {
        status: 'rejected',
        rejectionReason: reason || 'No reason provided'
      },
      { new: true }
    ).populate('author', 'username email');

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json({
      message: 'Article rejected',
      article
    });
  } catch (error) {
    console.error('Reject article error:', error);
    res.status(500).json({ message: 'Failed to reject article' });
  }
});

// Delete article
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Allow deletion by author or admin
    if (article.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this article' });
    }

    await Article.findByIdAndDelete(req.params.id);

    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Delete article error:', error);
    res.status(500).json({ message: 'Failed to delete article' });
  }
});

export default router;