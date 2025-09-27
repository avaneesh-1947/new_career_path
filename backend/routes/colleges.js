const express = require('express');
const { body, query, validationResult } = require('express-validator');
const College = require('../models/College');
const { optionalAuth } = require('../middleware/auth');
const { cache } = require('../config/redis');

const router = express.Router();

// @route   GET /api/colleges
// @desc    Get all colleges with filtering and pagination
// @access  Public
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('state').optional().isString().withMessage('State must be a string'),
  query('city').optional().isString().withMessage('City must be a string'),
  query('stream').optional().isIn(['science', 'commerce', 'arts', 'engineering', 'medical', 'management', 'law', 'pharmacy', 'other']).withMessage('Invalid stream'),
  query('type').optional().isIn(['Central University', 'State University', 'Deemed University', 'Private University', 'Government College', 'Autonomous College']).withMessage('Invalid college type'),
  query('minRating').optional().isFloat({ min: 0, max: 5 }).withMessage('Min rating must be between 0 and 5'),
  query('search').optional().isString().withMessage('Search must be a string'),
  query('sortBy').optional().isIn(['name', 'rating', 'established', 'createdAt']).withMessage('Invalid sort field'),
  query('sortOrder').optional().isIn(['asc', 'desc']).withMessage('Sort order must be asc or desc')
], optionalAuth, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      page = 1,
      limit = 10,
      state,
      city,
      stream,
      type,
      minRating,
      search,
      sortBy = 'rating',
      sortOrder = 'desc'
    } = req.query;

    // Build query
    const query = { isActive: true };

    if (state) {
      query['location.state'] = new RegExp(state, 'i');
    }

    if (city) {
      query['location.city'] = new RegExp(city, 'i');
    }

    if (stream) {
      query['courses.stream'] = stream;
    }

    if (type) {
      query.type = type;
    }

    if (minRating) {
      query.averageRating = { $gte: parseFloat(minRating) };
    }

    if (search) {
      query.$text = { $search: search };
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Create cache key
    const cacheKey = `colleges:${JSON.stringify({ query, sort, skip, limit })}`;

    // Try to get from cache first
    let colleges = await cache.get(cacheKey);

    if (!colleges) {
      // Get colleges from database
      colleges = await College.find(query)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .select('-reviews -images')
        .lean();

      // Cache for 1 hour
      await cache.set(cacheKey, colleges, 3600);
    }

    // Get total count
    const total = await College.countDocuments(query);

    res.status(200).json({
      status: 'success',
      data: {
        colleges,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalColleges: total,
          hasNext: skip + parseInt(limit) < total,
          hasPrev: parseInt(page) > 1
        }
      }
    });
  } catch (error) {
    console.error('Get colleges error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch colleges'
    });
  }
});

// @route   GET /api/colleges/:id
// @desc    Get single college by ID
// @access  Public
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const college = await College.findById(req.params.id);

    if (!college) {
      return res.status(404).json({
        status: 'error',
        message: 'College not found'
      });
    }

    if (!college.isActive) {
      return res.status(404).json({
        status: 'error',
        message: 'College not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        college
      }
    });
  } catch (error) {
    console.error('Get college error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch college'
    });
  }
});

// @route   GET /api/colleges/search/suggestions
// @desc    Get college search suggestions
// @access  Public
router.get('/search/suggestions', [
  query('q').notEmpty().withMessage('Query parameter is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { q } = req.query;

    const suggestions = await College.find({
      isActive: true,
      $text: { $search: q }
    })
      .select('name location.city location.state type')
      .limit(10)
      .lean();

    res.status(200).json({
      status: 'success',
      data: {
        suggestions
      }
    });
  } catch (error) {
    console.error('Get suggestions error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch suggestions'
    });
  }
});

// @route   GET /api/colleges/nearby
// @desc    Get nearby colleges
// @access  Public
router.get('/nearby', [
  query('latitude').isFloat().withMessage('Latitude must be a number'),
  query('longitude').isFloat().withMessage('Longitude must be a number'),
  query('radius').optional().isInt({ min: 1, max: 100 }).withMessage('Radius must be between 1 and 100 km')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { latitude, longitude, radius = 50 } = req.query;

    // For now, return colleges by state/city
    // In production, implement proper geospatial queries
    const colleges = await College.find({
      isActive: true,
      'location.coordinates.latitude': { $exists: true },
      'location.coordinates.longitude': { $exists: true }
    })
      .limit(20)
      .select('name location type averageRating courses.stream')
      .lean();

    res.status(200).json({
      status: 'success',
      data: {
        colleges
      }
    });
  } catch (error) {
    console.error('Get nearby colleges error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch nearby colleges'
    });
  }
});

// @route   GET /api/colleges/top-rated
// @desc    Get top rated colleges
// @access  Public
router.get('/top-rated', async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const cacheKey = `top-rated-colleges:${limit}`;
    let colleges = await cache.get(cacheKey);

    if (!colleges) {
      colleges = await College.getTopRated(parseInt(limit));
      await cache.set(cacheKey, colleges, 1800); // Cache for 30 minutes
    }

    res.status(200).json({
      status: 'success',
      data: {
        colleges
      }
    });
  } catch (error) {
    console.error('Get top rated colleges error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch top rated colleges'
    });
  }
});

// @route   GET /api/colleges/stats
// @desc    Get college statistics
// @access  Public
router.get('/stats/overview', async (req, res) => {
  try {
    const cacheKey = 'college-stats';
    let stats = await cache.get(cacheKey);

    if (!stats) {
      const [
        totalColleges,
        stateStats,
        streamStats,
        typeStats
      ] = await Promise.all([
        College.countDocuments({ isActive: true }),
        College.aggregate([
          { $match: { isActive: true } },
          { $group: { _id: '$location.state', count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 10 }
        ]),
        College.aggregate([
          { $match: { isActive: true } },
          { $unwind: '$courses' },
          { $group: { _id: '$courses.stream', count: { $sum: 1 } } },
          { $sort: { count: -1 } }
        ]),
        College.aggregate([
          { $match: { isActive: true } },
          { $group: { _id: '$type', count: { $sum: 1 } } },
          { $sort: { count: -1 } }
        ])
      ]);

      stats = {
        totalColleges,
        stateStats,
        streamStats,
        typeStats
      };

      await cache.set(cacheKey, stats, 3600); // Cache for 1 hour
    }

    res.status(200).json({
      status: 'success',
      data: {
        stats
      }
    });
  } catch (error) {
    console.error('Get college stats error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch college statistics'
    });
  }
});

module.exports = router;
