const express = require('express');
const { query, validationResult } = require('express-validator');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Career paths data
const careerPaths = {
  science: [
    {
      id: 'software-engineer',
      title: 'Software Engineer',
      degree: 'B.Tech Computer Science',
      duration: '4 years',
      salary: { min: 600000, max: 1500000 },
      growth: 'High',
      description: 'Design and develop software applications, websites, and systems.',
      skills: ['Programming', 'Problem Solving', 'Teamwork', 'Communication'],
      opportunities: ['Tech Companies', 'Startups', 'Government IT', 'Freelancing'],
      requirements: ['12th Science with PCM', 'JEE Main/Advanced', 'Good programming skills'],
      topColleges: ['IIT Delhi', 'IIT Bombay', 'IIT Madras', 'Delhi University'],
      futureProspects: 'Excellent growth potential with increasing digitization'
    },
    {
      id: 'data-scientist',
      title: 'Data Scientist',
      degree: 'B.Sc Data Science',
      duration: '3 years',
      salary: { min: 800000, max: 2000000 },
      growth: 'Very High',
      description: 'Analyze complex data to help organizations make informed decisions.',
      skills: ['Statistics', 'Machine Learning', 'Python', 'Analytics'],
      opportunities: ['Tech Giants', 'Consulting', 'Research', 'Finance'],
      requirements: ['12th Science with PCM', 'Strong mathematical background', 'Programming knowledge'],
      topColleges: ['IIT Delhi', 'IISc Bangalore', 'ISI Kolkata', 'JNU Delhi'],
      futureProspects: 'High demand with AI and ML growth'
    },
    {
      id: 'doctor',
      title: 'Doctor',
      degree: 'MBBS',
      duration: '5.5 years',
      salary: { min: 1000000, max: 2500000 },
      growth: 'Stable',
      description: 'Diagnose and treat patients, provide medical care and advice.',
      skills: ['Medical Knowledge', 'Empathy', 'Decision Making', 'Communication'],
      opportunities: ['Hospitals', 'Private Practice', 'Research', 'Government'],
      requirements: ['12th Science with PCB', 'NEET UG', 'Strong academic record'],
      topColleges: ['AIIMS Delhi', 'JIPMER Puducherry', 'CMC Vellore', 'KGMU Lucknow'],
      futureProspects: 'Always in demand, stable career'
    }
  ],
  commerce: [
    {
      id: 'chartered-accountant',
      title: 'Chartered Accountant',
      degree: 'B.Com + CA',
      duration: '5 years',
      salary: { min: 800000, max: 1800000 },
      growth: 'High',
      description: 'Manage financial records, audit accounts, and provide financial advice.',
      skills: ['Accounting', 'Taxation', 'Auditing', 'Financial Analysis'],
      opportunities: ['CA Firms', 'Corporations', 'Government', 'Consulting'],
      requirements: ['12th Commerce', 'CA Foundation', 'Strong numerical skills'],
      topColleges: ['SRCC Delhi', 'Loyola College Chennai', 'St. Xavier\'s Mumbai', 'Christ University Bangalore'],
      futureProspects: 'High demand in corporate sector'
    },
    {
      id: 'investment-banker',
      title: 'Investment Banker',
      degree: 'B.Com Finance',
      duration: '3 years',
      salary: { min: 1200000, max: 3000000 },
      growth: 'Very High',
      description: 'Help companies raise capital and provide financial advisory services.',
      skills: ['Financial Modeling', 'Negotiation', 'Analytics', 'Communication'],
      opportunities: ['Investment Banks', 'Private Equity', 'Hedge Funds', 'Corporations'],
      requirements: ['12th Commerce', 'Strong analytical skills', 'MBA preferred'],
      topColleges: ['IIM Ahmedabad', 'IIM Bangalore', 'IIM Calcutta', 'XLRI Jamshedpur'],
      futureProspects: 'High earning potential, competitive field'
    }
  ],
  arts: [
    {
      id: 'journalist',
      title: 'Journalist',
      degree: 'B.A Journalism',
      duration: '3 years',
      salary: { min: 400000, max: 1200000 },
      growth: 'Moderate',
      description: 'Research, write, and report news stories for various media outlets.',
      skills: ['Writing', 'Research', 'Communication', 'Critical Thinking'],
      opportunities: ['News Channels', 'Newspapers', 'Online Media', 'Freelancing'],
      requirements: ['12th Arts', 'Good communication skills', 'Current affairs knowledge'],
      topColleges: ['Jamia Millia Islamia', 'Delhi University', 'Symbiosis Pune', 'Manipal University'],
      futureProspects: 'Growing digital media opportunities'
    },
    {
      id: 'psychologist',
      title: 'Psychologist',
      degree: 'B.A Psychology',
      duration: '3 years',
      salary: { min: 500000, max: 1500000 },
      growth: 'High',
      description: 'Study human behavior and provide mental health support.',
      skills: ['Empathy', 'Active Listening', 'Analysis', 'Communication'],
      opportunities: ['Hospitals', 'Schools', 'Private Practice', 'Research'],
      requirements: ['12th Arts', 'Strong interpersonal skills', 'Psychology interest'],
      topColleges: ['Delhi University', 'JNU Delhi', 'TISS Mumbai', 'Christ University Bangalore'],
      futureProspects: 'Increasing awareness of mental health'
    }
  ]
};

// @route   GET /api/career/paths
// @desc    Get career paths by stream
// @access  Private
router.get('/paths', [
  query('stream').optional().isIn(['science', 'commerce', 'arts', 'engineering', 'medical']).withMessage('Invalid stream')
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

    const { stream } = req.query;

    if (stream) {
      const paths = careerPaths[stream] || [];
      res.status(200).json({
        status: 'success',
        data: {
          stream,
          careerPaths: paths
        }
      });
    } else {
      res.status(200).json({
        status: 'success',
        data: {
          allCareerPaths: careerPaths
        }
      });
    }
  } catch (error) {
    console.error('Get career paths error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch career paths'
    });
  }
});

// @route   GET /api/career/paths/:id
// @desc    Get specific career path details
// @access  Private
router.get('/paths/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    // Find career path across all streams
    let careerPath = null;
    let stream = null;

    for (const [streamName, paths] of Object.entries(careerPaths)) {
      const found = paths.find(path => path.id === id);
      if (found) {
        careerPath = found;
        stream = streamName;
        break;
      }
    }

    if (!careerPath) {
      return res.status(404).json({
        status: 'error',
        message: 'Career path not found'
      });
    }

    // Add additional details
    const detailedCareerPath = {
      ...careerPath,
      stream,
      salaryRange: `₹${(careerPath.salary.min / 100000).toFixed(1)}L - ₹${(careerPath.salary.max / 100000).toFixed(1)}L`,
      growthPotential: getGrowthPotential(careerPath.growth),
      skillRequirements: careerPath.skills.map(skill => ({
        skill,
        importance: getSkillImportance(skill),
        developmentTips: getSkillDevelopmentTips(skill)
      })),
      careerProgression: getCareerProgression(careerPath.id),
      relatedCareers: getRelatedCareers(careerPath.id, stream)
    };

    res.status(200).json({
      status: 'success',
      data: {
        careerPath: detailedCareerPath
      }
    });
  } catch (error) {
    console.error('Get career path error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch career path details'
    });
  }
});

// @route   GET /api/career/recommendations
// @desc    Get personalized career recommendations
// @access  Private
router.get('/recommendations', authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    
    // Get user's aptitude results
    const aptitudeResults = user.aptitudeResults;
    
    if (!aptitudeResults || !aptitudeResults.careerRecommendations || aptitudeResults.careerRecommendations.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'No career recommendations found. Please take the aptitude test first.'
      });
    }

    const latestRecommendations = aptitudeResults.careerRecommendations.slice(-3);
    
    // Get detailed career information for recommendations
    const detailedRecommendations = latestRecommendations.map(rec => {
      const careerPath = findCareerPathById(rec.career);
      return {
        ...rec,
        details: careerPath
      };
    });

    // Get additional recommendations based on user profile
    const additionalRecommendations = getAdditionalRecommendations(user);

    res.status(200).json({
      status: 'success',
      data: {
        primaryRecommendations: detailedRecommendations,
        additionalRecommendations,
        userProfile: {
          stream: user.stream,
          class: user.class,
          location: user.location
        }
      }
    });
  } catch (error) {
    console.error('Get recommendations error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch career recommendations'
    });
  }
});

// @route   GET /api/career/trends
// @desc    Get career trends and market insights
// @access  Private
router.get('/trends', authMiddleware, async (req, res) => {
  try {
    const trends = {
      emergingCareers: [
        {
          title: 'AI/ML Engineer',
          growth: 'Very High',
          salary: '₹8-20 LPA',
          description: 'Develop artificial intelligence and machine learning solutions'
        },
        {
          title: 'Data Analyst',
          growth: 'High',
          salary: '₹5-12 LPA',
          description: 'Analyze data to help businesses make informed decisions'
        },
        {
          title: 'Cybersecurity Specialist',
          growth: 'High',
          salary: '₹6-15 LPA',
          description: 'Protect organizations from cyber threats and attacks'
        }
      ],
      decliningCareers: [
        {
          title: 'Traditional Banking Clerk',
          growth: 'Low',
          reason: 'Automation and digital banking'
        },
        {
          title: 'Data Entry Operator',
          growth: 'Low',
          reason: 'AI-powered automation'
        }
      ],
      skillDemand: [
        { skill: 'Python Programming', demand: 'Very High', growth: '+25%' },
        { skill: 'Data Analysis', demand: 'High', growth: '+20%' },
        { skill: 'Digital Marketing', demand: 'High', growth: '+18%' },
        { skill: 'Cloud Computing', demand: 'High', growth: '+22%' }
      ],
      industryInsights: [
        {
          industry: 'Technology',
          growth: 'Very High',
          keyTrends: ['AI/ML adoption', 'Remote work', 'Digital transformation']
        },
        {
          industry: 'Healthcare',
          growth: 'High',
          keyTrends: ['Telemedicine', 'AI diagnostics', 'Preventive care']
        },
        {
          industry: 'Finance',
          growth: 'Moderate',
          keyTrends: ['Fintech', 'Digital payments', 'Blockchain']
        }
      ]
    };

    res.status(200).json({
      status: 'success',
      data: {
        trends,
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Get trends error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch career trends'
    });
  }
});

// Helper functions
function findCareerPathById(careerName) {
  for (const paths of Object.values(careerPaths)) {
    const found = paths.find(path => path.title === careerName);
    if (found) return found;
  }
  return null;
}

function getGrowthPotential(growth) {
  const growthMap = {
    'Very High': { score: 5, description: 'Excellent growth opportunities with high demand' },
    'High': { score: 4, description: 'Good growth potential with steady demand' },
    'Moderate': { score: 3, description: 'Stable growth with moderate demand' },
    'Low': { score: 2, description: 'Limited growth opportunities' }
  };
  return growthMap[growth] || growthMap['Moderate'];
}

function getSkillImportance(skill) {
  const importanceMap = {
    'Programming': 'Critical',
    'Problem Solving': 'Critical',
    'Communication': 'High',
    'Teamwork': 'High',
    'Analytics': 'High',
    'Leadership': 'Medium'
  };
  return importanceMap[skill] || 'Medium';
}

function getSkillDevelopmentTips(skill) {
  const tipsMap = {
    'Programming': ['Practice coding daily', 'Build projects', 'Contribute to open source'],
    'Problem Solving': ['Solve puzzles', 'Practice algorithms', 'Work on real-world problems'],
    'Communication': ['Join debate clubs', 'Practice public speaking', 'Write regularly'],
    'Teamwork': ['Join group projects', 'Participate in team sports', 'Volunteer for community work']
  };
  return tipsMap[skill] || ['Practice regularly', 'Seek feedback', 'Learn from experts'];
}

function getCareerProgression(careerId) {
  const progressions = {
    'software-engineer': [
      { level: 'Junior Developer', experience: '0-2 years', salary: '₹4-8 LPA' },
      { level: 'Senior Developer', experience: '2-5 years', salary: '₹8-15 LPA' },
      { level: 'Tech Lead', experience: '5-8 years', salary: '₹15-25 LPA' },
      { level: 'Engineering Manager', experience: '8+ years', salary: '₹25-40 LPA' }
    ],
    'data-scientist': [
      { level: 'Data Analyst', experience: '0-2 years', salary: '₹5-10 LPA' },
      { level: 'Data Scientist', experience: '2-5 years', salary: '₹10-20 LPA' },
      { level: 'Senior Data Scientist', experience: '5-8 years', salary: '₹20-35 LPA' },
      { level: 'Data Science Manager', experience: '8+ years', salary: '₹35-50 LPA' }
    ]
  };
  return progressions[careerId] || [];
}

function getRelatedCareers(careerId, stream) {
  const related = {
    'software-engineer': ['Web Developer', 'Mobile App Developer', 'DevOps Engineer', 'Product Manager'],
    'data-scientist': ['Data Analyst', 'Business Analyst', 'Machine Learning Engineer', 'Research Scientist'],
    'doctor': ['Surgeon', 'Specialist', 'Medical Researcher', 'Public Health Officer']
  };
  return related[careerId] || [];
}

function getAdditionalRecommendations(user) {
  const recommendations = [];
  
  if (user.stream === 'science') {
    recommendations.push({
      career: 'Research Scientist',
      match: 75,
      reasoning: 'Based on your scientific background and analytical thinking'
    });
  }
  
  if (user.location?.state === 'Delhi' || user.location?.state === 'Maharashtra') {
    recommendations.push({
      career: 'Government Officer',
      match: 70,
      reasoning: 'Good opportunities in government sector in your location'
    });
  }
  
  return recommendations;
}

module.exports = router;
