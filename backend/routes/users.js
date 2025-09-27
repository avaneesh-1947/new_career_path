const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { authMiddleware, checkOwnership } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get current user profile
// @access  Private
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: {
        user: req.user.getPublicProfile()
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch profile'
    });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', [
  body('name').optional().trim().isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  body('phone').optional().matches(/^[6-9]\d{9}$/).withMessage('Please provide a valid phone number'),
  body('dateOfBirth').optional().isISO8601().withMessage('Please provide a valid date'),
  body('gender').optional().isIn(['male', 'female', 'other']).withMessage('Invalid gender'),
  body('class').optional().isIn(['10th', '11th', '12th', 'graduation', 'post-graduation']).withMessage('Invalid class'),
  body('stream').optional().isIn(['science', 'commerce', 'arts', 'engineering', 'medical', 'other']).withMessage('Invalid stream'),
  body('bio').optional().trim().isLength({ max: 500 }).withMessage('Bio cannot be more than 500 characters')
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

    const allowedUpdates = [
      'name', 'phone', 'dateOfBirth', 'gender', 'class', 'stream', 
      'location', 'preferences', 'profile', 'notifications'
    ];

    const updates = {};
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: 'success',
      message: 'Profile updated successfully',
      data: {
        user: user.getPublicProfile()
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update profile'
    });
  }
});

// @route   POST /api/users/colleges/shortlist
// @desc    Add college to shortlist
// @access  Private
router.post('/colleges/shortlist', [
  body('collegeId').isMongoId().withMessage('Valid college ID is required'),
  body('notes').optional().trim().isLength({ max: 500 }).withMessage('Notes cannot be more than 500 characters')
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

    const { collegeId, notes } = req.body;

    // Check if college is already shortlisted
    const existingShortlist = req.user.collegePreferences.shortlisted.find(
      item => item.collegeId.toString() === collegeId
    );

    if (existingShortlist) {
      return res.status(400).json({
        status: 'error',
        message: 'College is already in your shortlist'
      });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        'collegePreferences.shortlisted': {
          collegeId,
          addedAt: new Date(),
          notes: notes || ''
        }
      }
    });

    res.status(200).json({
      status: 'success',
      message: 'College added to shortlist successfully'
    });
  } catch (error) {
    console.error('Add to shortlist error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to add college to shortlist'
    });
  }
});

// @route   DELETE /api/users/colleges/shortlist/:collegeId
// @desc    Remove college from shortlist
// @access  Private
router.delete('/colleges/shortlist/:collegeId', authMiddleware, async (req, res) => {
  try {
    const { collegeId } = req.params;

    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        'collegePreferences.shortlisted': { collegeId }
      }
    });

    res.status(200).json({
      status: 'success',
      message: 'College removed from shortlist successfully'
    });
  } catch (error) {
    console.error('Remove from shortlist error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to remove college from shortlist'
    });
  }
});

// @route   GET /api/users/colleges/shortlist
// @desc    Get user's shortlisted colleges
// @access  Private
router.get('/colleges/shortlist', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('collegePreferences.shortlisted.collegeId')
      .select('collegePreferences.shortlisted');

    const shortlistedColleges = user.collegePreferences.shortlisted.map(item => ({
      college: item.collegeId,
      addedAt: item.addedAt,
      notes: item.notes
    }));

    res.status(200).json({
      status: 'success',
      data: {
        shortlistedColleges
      }
    });
  } catch (error) {
    console.error('Get shortlist error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch shortlisted colleges'
    });
  }
});

// @route   POST /api/users/colleges/apply
// @desc    Mark college as applied
// @access  Private
router.post('/colleges/apply', [
  body('collegeId').isMongoId().withMessage('Valid college ID is required'),
  body('status').optional().isIn(['applied', 'under-review', 'accepted', 'rejected', 'waitlisted']).withMessage('Invalid status')
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

    const { collegeId, status = 'applied' } = req.body;

    // Check if already applied
    const existingApplication = req.user.collegePreferences.applied.find(
      item => item.collegeId.toString() === collegeId
    );

    if (existingApplication) {
      return res.status(400).json({
        status: 'error',
        message: 'You have already applied to this college'
      });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        'collegePreferences.applied': {
          collegeId,
          appliedAt: new Date(),
          status
        }
      }
    });

    res.status(200).json({
      status: 'success',
      message: 'Application recorded successfully'
    });
  } catch (error) {
    console.error('Record application error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to record application'
    });
  }
});

// @route   GET /api/users/colleges/applications
// @desc    Get user's college applications
// @access  Private
router.get('/colleges/applications', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('collegePreferences.applied.collegeId')
      .select('collegePreferences.applied');

    const applications = user.collegePreferences.applied.map(item => ({
      college: item.collegeId,
      appliedAt: item.appliedAt,
      status: item.status
    }));

    res.status(200).json({
      status: 'success',
      data: {
        applications
      }
    });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch applications'
    });
  }
});

// @route   GET /api/users/dashboard
// @desc    Get user dashboard data
// @access  Private
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('collegePreferences.shortlisted.collegeId')
      .populate('collegePreferences.applied.collegeId')
      .select('aptitudeResults collegePreferences profile preferences');

    const dashboardData = {
      user: {
        name: user.name,
        class: user.class,
        stream: user.stream,
        location: user.location
      },
      stats: {
        testsCompleted: user.aptitudeResults?.testScores?.length || 0,
        collegesShortlisted: user.collegePreferences?.shortlisted?.length || 0,
        applicationsSubmitted: user.collegePreferences?.applied?.length || 0,
        careerMatch: user.aptitudeResults?.testScores?.length > 0 ? 
          user.aptitudeResults.testScores[user.aptitudeResults.testScores.length - 1].score : 0
      },
      recentActivity: {
        lastTestDate: user.aptitudeResults?.testScores?.length > 0 ? 
          user.aptitudeResults.testScores[user.aptitudeResults.testScores.length - 1].completedAt : null,
        lastShortlistDate: user.collegePreferences?.shortlisted?.length > 0 ? 
          user.collegePreferences.shortlisted[user.collegePreferences.shortlisted.length - 1].addedAt : null
      },
      recommendations: user.aptitudeResults?.careerRecommendations?.slice(-3) || []
    };

    res.status(200).json({
      status: 'success',
      data: dashboardData
    });
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch dashboard data'
    });
  }
});

// @route   DELETE /api/users/account
// @desc    Delete user account
// @access  Private
router.delete('/account', authMiddleware, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, {
      isActive: false
    });

    res.status(200).json({
      status: 'success',
      message: 'Account deactivated successfully'
    });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to deactivate account'
    });
  }
});

module.exports = router;
