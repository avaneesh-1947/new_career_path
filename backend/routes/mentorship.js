const express = require('express');
const { body, validationResult } = require('express-validator');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// In-memory storage for mentorship data (use database in production)
const mentors = new Map();
const mentorshipSessions = new Map();

// Sample mentors data
const sampleMentors = [
  {
    id: 'mentor1',
    name: 'Dr. Rajesh Kumar',
    title: 'Senior Software Engineer at Google',
    experience: '8 years',
    specialization: 'Software Engineering, AI/ML',
    education: 'B.Tech IIT Delhi, MS Stanford',
    rating: 4.9,
    sessionsCompleted: 150,
    bio: 'Passionate about helping students build successful careers in technology. Expert in software engineering and machine learning.',
    availability: ['Monday', 'Wednesday', 'Friday'],
    timeSlots: ['10:00 AM', '2:00 PM', '4:00 PM'],
    languages: ['English', 'Hindi'],
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'mentor2',
    name: 'Dr. Priya Sharma',
    title: 'Medical Doctor at AIIMS Delhi',
    experience: '12 years',
    specialization: 'Medicine, Research',
    education: 'MBBS AIIMS Delhi, MD Internal Medicine',
    rating: 4.8,
    sessionsCompleted: 200,
    bio: 'Dedicated to guiding aspiring medical students. Expert in medical education and career planning.',
    availability: ['Tuesday', 'Thursday', 'Saturday'],
    timeSlots: ['11:00 AM', '3:00 PM', '5:00 PM'],
    languages: ['English', 'Hindi'],
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'mentor3',
    name: 'Prof. Amit Singh',
    title: 'Chartered Accountant & Financial Advisor',
    experience: '15 years',
    specialization: 'Finance, Accounting, Business',
    education: 'CA, MBA IIM Ahmedabad',
    rating: 4.7,
    sessionsCompleted: 180,
    bio: 'Experienced CA helping students understand finance and business careers. Expert in career guidance.',
    availability: ['Monday', 'Wednesday', 'Friday'],
    timeSlots: ['9:00 AM', '1:00 PM', '6:00 PM'],
    languages: ['English', 'Hindi', 'Punjabi'],
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  }
];

// Initialize sample mentors
sampleMentors.forEach(mentor => {
  mentors.set(mentor.id, mentor);
});

// @route   GET /api/mentorship/mentors
// @desc    Get available mentors
// @access  Private
router.get('/mentors', authMiddleware, async (req, res) => {
  try {
    const { specialization, availability, rating } = req.query;
    
    let availableMentors = Array.from(mentors.values());

    // Filter by specialization
    if (specialization) {
      availableMentors = availableMentors.filter(mentor => 
        mentor.specialization.toLowerCase().includes(specialization.toLowerCase())
      );
    }

    // Filter by availability
    if (availability) {
      availableMentors = availableMentors.filter(mentor => 
        mentor.availability.includes(availability)
      );
    }

    // Filter by minimum rating
    if (rating) {
      const minRating = parseFloat(rating);
      availableMentors = availableMentors.filter(mentor => mentor.rating >= minRating);
    }

    res.status(200).json({
      status: 'success',
      data: {
        mentors: availableMentors,
        totalCount: availableMentors.length
      }
    });
  } catch (error) {
    console.error('Get mentors error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch mentors'
    });
  }
});

// @route   GET /api/mentorship/mentors/:id
// @desc    Get mentor details
// @access  Private
router.get('/mentors/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const mentor = mentors.get(id);

    if (!mentor) {
      return res.status(404).json({
        status: 'error',
        message: 'Mentor not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        mentor
      }
    });
  } catch (error) {
    console.error('Get mentor details error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch mentor details'
    });
  }
});

// @route   POST /api/mentorship/sessions/request
// @desc    Request a mentorship session
// @access  Private
router.post('/sessions/request', [
  body('mentorId').notEmpty().withMessage('Mentor ID is required'),
  body('preferredDate').isISO8601().withMessage('Valid date is required'),
  body('preferredTime').notEmpty().withMessage('Preferred time is required'),
  body('duration').isInt({ min: 30, max: 120 }).withMessage('Duration must be between 30 and 120 minutes'),
  body('topics').isArray().withMessage('Topics must be an array'),
  body('message').optional().trim().isLength({ max: 500 }).withMessage('Message cannot be more than 500 characters')
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

    const { mentorId, preferredDate, preferredTime, duration, topics, message } = req.body;
    const userId = req.user._id.toString();

    // Check if mentor exists
    const mentor = mentors.get(mentorId);
    if (!mentor) {
      return res.status(404).json({
        status: 'error',
        message: 'Mentor not found'
      });
    }

    // Create session request
    const sessionId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const session = {
      id: sessionId,
      studentId: userId,
      studentName: req.user.name,
      mentorId,
      mentorName: mentor.name,
      preferredDate: new Date(preferredDate),
      preferredTime,
      duration,
      topics,
      message: message || '',
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Store session
    const userSessions = mentorshipSessions.get(userId) || [];
    userSessions.push(session);
    mentorshipSessions.set(userId, userSessions);

    res.status(201).json({
      status: 'success',
      message: 'Mentorship session requested successfully',
      data: {
        session
      }
    });
  } catch (error) {
    console.error('Request mentorship session error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to request mentorship session'
    });
  }
});

// @route   GET /api/mentorship/sessions
// @desc    Get user's mentorship sessions
// @access  Private
router.get('/sessions', authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const userSessions = mentorshipSessions.get(userId) || [];

    // Sort by date (newest first)
    const sortedSessions = userSessions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json({
      status: 'success',
      data: {
        sessions: sortedSessions,
        totalCount: userSessions.length
      }
    });
  } catch (error) {
    console.error('Get mentorship sessions error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch mentorship sessions'
    });
  }
});

// @route   GET /api/mentorship/sessions/:id
// @desc    Get specific mentorship session
// @access  Private
router.get('/sessions/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id.toString();
    const userSessions = mentorshipSessions.get(userId) || [];

    const session = userSessions.find(s => s.id === id);
    if (!session) {
      return res.status(404).json({
        status: 'error',
        message: 'Session not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        session
      }
    });
  } catch (error) {
    console.error('Get mentorship session error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch mentorship session'
    });
  }
});

// @route   PUT /api/mentorship/sessions/:id/cancel
// @desc    Cancel a mentorship session
// @access  Private
router.put('/sessions/:id/cancel', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id.toString();
    const userSessions = mentorshipSessions.get(userId) || [];

    const sessionIndex = userSessions.findIndex(s => s.id === id);
    if (sessionIndex === -1) {
      return res.status(404).json({
        status: 'error',
        message: 'Session not found'
      });
    }

    const session = userSessions[sessionIndex];
    if (session.status === 'completed' || session.status === 'cancelled') {
      return res.status(400).json({
        status: 'error',
        message: 'Cannot cancel this session'
      });
    }

    // Update session status
    session.status = 'cancelled';
    session.updatedAt = new Date();
    userSessions[sessionIndex] = session;
    mentorshipSessions.set(userId, userSessions);

    res.status(200).json({
      status: 'success',
      message: 'Session cancelled successfully'
    });
  } catch (error) {
    console.error('Cancel mentorship session error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to cancel session'
    });
  }
});

// @route   POST /api/mentorship/sessions/:id/feedback
// @desc    Submit feedback for a completed session
// @access  Private
router.post('/sessions/:id/feedback', [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').optional().trim().isLength({ max: 500 }).withMessage('Comment cannot be more than 500 characters')
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

    const { id } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user._id.toString();
    const userSessions = mentorshipSessions.get(userId) || [];

    const sessionIndex = userSessions.findIndex(s => s.id === id);
    if (sessionIndex === -1) {
      return res.status(404).json({
        status: 'error',
        message: 'Session not found'
      });
    }

    const session = userSessions[sessionIndex];
    if (session.status !== 'completed') {
      return res.status(400).json({
        status: 'error',
        message: 'Can only provide feedback for completed sessions'
      });
    }

    // Add feedback
    session.feedback = {
      rating,
      comment: comment || '',
      submittedAt: new Date()
    };
    session.updatedAt = new Date();
    userSessions[sessionIndex] = session;
    mentorshipSessions.set(userId, userSessions);

    res.status(200).json({
      status: 'success',
      message: 'Feedback submitted successfully'
    });
  } catch (error) {
    console.error('Submit feedback error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to submit feedback'
    });
  }
});

// @route   GET /api/mentorship/availability/:mentorId
// @desc    Get mentor availability
// @access  Private
router.get('/availability/:mentorId', authMiddleware, async (req, res) => {
  try {
    const { mentorId } = req.params;
    const mentor = mentors.get(mentorId);

    if (!mentor) {
      return res.status(404).json({
        status: 'error',
        message: 'Mentor not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        availability: mentor.availability,
        timeSlots: mentor.timeSlots
      }
    });
  } catch (error) {
    console.error('Get mentor availability error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch mentor availability'
    });
  }
});

module.exports = router;
