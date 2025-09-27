const express = require('express');
const { body, validationResult } = require('express-validator');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// In-memory storage for notifications (use Redis in production)
const notifications = new Map();

// @route   GET /api/notifications
// @desc    Get user notifications
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const userNotifications = notifications.get(userId) || [];

    // Sort by date (newest first)
    const sortedNotifications = userNotifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json({
      status: 'success',
      data: {
        notifications: sortedNotifications,
        unreadCount: userNotifications.filter(n => !n.read).length
      }
    });
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch notifications'
    });
  }
});

// @route   POST /api/notifications/mark-read
// @desc    Mark notifications as read
// @access  Private
router.post('/mark-read', [
  body('notificationIds').isArray().withMessage('Notification IDs must be an array'),
  body('notificationIds.*').isString().withMessage('Each notification ID must be a string')
], authMiddleware, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { notificationIds } = req.body;
    const userId = req.user._id.toString();
    const userNotifications = notifications.get(userId) || [];

    // Mark specified notifications as read
    notificationIds.forEach(id => {
      const notification = userNotifications.find(n => n.id === id);
      if (notification) {
        notification.read = true;
        notification.readAt = new Date();
      }
    });

    notifications.set(userId, userNotifications);

    res.status(200).json({
      status: 'success',
      message: 'Notifications marked as read'
    });
  } catch (error) {
    console.error('Mark notifications read error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to mark notifications as read'
    });
  }
});

// @route   DELETE /api/notifications/:id
// @desc    Delete a notification
// @access  Private
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id.toString();
    const userNotifications = notifications.get(userId) || [];

    // Remove notification
    const filteredNotifications = userNotifications.filter(n => n.id !== id);
    notifications.set(userId, filteredNotifications);

    res.status(200).json({
      status: 'success',
      message: 'Notification deleted successfully'
    });
  } catch (error) {
    console.error('Delete notification error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete notification'
    });
  }
});

// @route   POST /api/notifications/clear-all
// @desc    Clear all notifications
// @access  Private
router.post('/clear-all', authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id.toString();
    notifications.set(userId, []);

    res.status(200).json({
      status: 'success',
      message: 'All notifications cleared'
    });
  } catch (error) {
    console.error('Clear all notifications error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to clear notifications'
    });
  }
});

// @route   GET /api/notifications/preferences
// @desc    Get notification preferences
// @access  Private
router.get('/preferences', authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    
    res.status(200).json({
      status: 'success',
      data: {
        preferences: user.notifications || {
          email: true,
          push: true,
          sms: false
        }
      }
    });
  } catch (error) {
    console.error('Get notification preferences error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch notification preferences'
    });
  }
});

// @route   PUT /api/notifications/preferences
// @desc    Update notification preferences
// @access  Private
router.put('/preferences', [
  body('email').optional().isBoolean().withMessage('Email preference must be boolean'),
  body('push').optional().isBoolean().withMessage('Push preference must be boolean'),
  body('sms').optional().isBoolean().withMessage('SMS preference must be boolean')
], authMiddleware, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, push, sms } = req.body;
    const userId = req.user._id;

    // Update user preferences
    const updateData = {};
    if (email !== undefined) updateData['notifications.email'] = email;
    if (push !== undefined) updateData['notifications.push'] = push;
    if (sms !== undefined) updateData['notifications.sms'] = sms;

    const User = require('../models/User');
    await User.findByIdAndUpdate(userId, updateData);

    res.status(200).json({
      status: 'success',
      message: 'Notification preferences updated successfully'
    });
  } catch (error) {
    console.error('Update notification preferences error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update notification preferences'
    });
  }
});

// Helper function to create notification
function createNotification(userId, type, title, message, data = {}) {
  const notification = {
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    type,
    title,
    message,
    data,
    read: false,
    createdAt: new Date(),
    readAt: null
  };

  const userNotifications = notifications.get(userId) || [];
  userNotifications.push(notification);
  notifications.set(userId, userNotifications);

  return notification;
}

// Helper function to get notification icon
function getNotificationIcon(type) {
  const icons = {
    admission: '🎓',
    scholarship: '💰',
    career: '🎯',
    college: '🏫',
    exam: '📝',
    deadline: '⏰',
    general: '📢'
  };
  return icons[type] || icons.general;
}

// Sample notifications for demo
function createSampleNotifications(userId) {
  const sampleNotifications = [
    {
      type: 'admission',
      title: 'Delhi University Admission Open',
      message: 'Applications for undergraduate courses are now open. Deadline: July 15, 2024',
      data: { collegeId: 'du123', deadline: '2024-07-15' }
    },
    {
      type: 'scholarship',
      title: 'Merit Scholarship Available',
      message: 'You qualify for the National Merit Scholarship. Apply before June 30, 2024',
      data: { scholarshipId: 'merit123', amount: 50000 }
    },
    {
      type: 'career',
      title: 'Career Recommendation Updated',
      message: 'Based on your latest test, we recommend exploring Computer Science programs',
      data: { careerId: 'software-engineer', match: 95 }
    },
    {
      type: 'exam',
      title: 'JEE Main 2024 Registration',
      message: 'Registration for JEE Main 2024 is now open. Last date: December 15, 2023',
      data: { examId: 'jee-main-2024', deadline: '2023-12-15' }
    },
    {
      type: 'deadline',
      title: 'College Application Deadline Approaching',
      message: 'Your shortlisted college applications are due in 3 days',
      data: { colleges: ['du123', 'jnu456'], daysLeft: 3 }
    }
  ];

  sampleNotifications.forEach(notif => {
    createNotification(userId, notif.type, notif.title, notif.message, notif.data);
  });
}

// Initialize sample notifications for demo users
router.post('/init-sample', authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id.toString();
    createSampleNotifications(userId);

    res.status(200).json({
      status: 'success',
      message: 'Sample notifications created'
    });
  } catch (error) {
    console.error('Init sample notifications error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create sample notifications'
    });
  }
});

module.exports = router;
