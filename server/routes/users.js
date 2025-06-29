import express from 'express';
import User from '../models/User.js';
import Article from '../models/Article.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get dashboard stats
router.get('/dashboard/stats', authenticateToken, async (req, res) => {
  try {
    if (req.user.role === 'admin') {
      // Admin stats
      const totalUsers = await User.countDocuments({ role: 'user' });
      const totalArticles = await Article.countDocuments();
      const pendingArticles = await Article.countDocuments({ status: 'pending' });
      const approvedArticles = await Article.countDocuments({ status: 'approved' });

      res.json({
        totalUsers,
        totalArticles,
        pendingArticles,
        approvedArticles
      });
    } else {
      // User stats
      const userArticles = await Article.countDocuments({ author: req.user._id });
      const pendingArticles = await Article.countDocuments({ 
        author: req.user._id, 
        status: 'pending' 
      });
      const approvedArticles = await Article.countDocuments({ 
        author: req.user._id, 
        status: 'approved' 
      });

      res.json({
        userArticles,
        pendingArticles,
        approvedArticles
      });
    }
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ message: 'Failed to fetch dashboard stats' });
  }
});

// Get all users (admin only)
router.get('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const users = await User.find({ role: 'user' })
      .select('-password')
      .sort({ createdAt: -1 });

    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// Delete a user (admin only)
router.delete('/:userId', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { userId } = req.params;

    // Delete all articles by this user
    await Article.deleteMany({ author: null });

    // Delete the user
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User and their articles deleted' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Failed to delete user' });
  }
});

export default router;