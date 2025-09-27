const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Sample aptitude questions
const aptitudeQuestions = [
  {
    id: 1,
    question: "Which activity do you enjoy most?",
    options: ["Solving puzzles and problems", "Creating art or music", "Working with numbers and data", "Helping others and socializing"],
    category: "Interest"
  },
  {
    id: 2,
    question: "What type of work environment do you prefer?",
    options: ["Quiet office with minimal distractions", "Dynamic team environment", "Outdoor or field work", "Creative studio or workshop"],
    category: "Work Style"
  },
  {
    id: 3,
    question: "Which subject interests you most?",
    options: ["Mathematics and Science", "Literature and Languages", "History and Social Studies", "Arts and Design"],
    category: "Academic Interest"
  },
  {
    id: 4,
    question: "How do you prefer to learn new things?",
    options: ["Through hands-on practice", "By reading and research", "Through group discussions", "By watching demonstrations"],
    category: "Learning Style"
  },
  {
    id: 5,
    question: "What motivates you most?",
    options: ["Financial success and stability", "Making a positive impact", "Personal growth and development", "Recognition and achievement"],
    category: "Motivation"
  },
  {
    id: 6,
    question: "Which skill would you like to develop most?",
    options: ["Technical and analytical skills", "Communication and leadership", "Creative and artistic skills", "Problem-solving and critical thinking"],
    category: "Skill Development"
  },
  {
    id: 7,
    question: "What type of challenges do you enjoy?",
    options: ["Complex technical problems", "Creative design challenges", "Social and interpersonal issues", "Strategic planning and analysis"],
    category: "Challenge Preference"
  },
  {
    id: 8,
    question: "How do you handle stress?",
    options: ["By analyzing the problem systematically", "By talking to friends and family", "By engaging in creative activities", "By taking action immediately"],
    category: "Stress Management"
  },
  {
    id: 9,
    question: "What is your ideal career outcome?",
    options: ["Becoming an expert in a specific field", "Leading and managing teams", "Creating innovative solutions", "Making a difference in society"],
    category: "Career Goals"
  },
  {
    id: 10,
    question: "Which type of work schedule appeals to you?",
    options: ["Regular 9-to-5 schedule", "Flexible and varied hours", "Project-based deadlines", "Seasonal or contract work"],
    category: "Work Schedule"
  }
];

// Career recommendations based on answers
const careerRecommendations = {
  technology: {
    careers: [
      {
        name: "Software Engineer",
        match: 95,
        reasoning: "Strong analytical and problem-solving skills with interest in technology",
        stream: "Science",
        courses: ["B.Tech Computer Science", "B.Sc Computer Science", "BCA"]
      },
      {
        name: "Data Scientist",
        match: 88,
        reasoning: "Excellent analytical abilities and interest in working with data",
        stream: "Science",
        courses: ["B.Sc Data Science", "B.Tech Computer Science", "B.Sc Statistics"]
      }
    ]
  },
  science: {
    careers: [
      {
        name: "Doctor",
        match: 92,
        reasoning: "Strong interest in helping others and scientific knowledge",
        stream: "Science",
        courses: ["MBBS", "BDS", "B.Sc Nursing"]
      },
      {
        name: "Research Scientist",
        match: 85,
        reasoning: "Curious mind and analytical thinking",
        stream: "Science",
        courses: ["B.Sc Physics", "B.Sc Chemistry", "B.Sc Biology"]
      }
    ]
  },
  commerce: {
    careers: [
      {
        name: "Chartered Accountant",
        match: 90,
        reasoning: "Strong numerical skills and attention to detail",
        stream: "Commerce",
        courses: ["B.Com", "CA", "BBA"]
      },
      {
        name: "Investment Banker",
        match: 87,
        reasoning: "Analytical mind and interest in finance",
        stream: "Commerce",
        courses: ["B.Com Finance", "BBA", "MBA Finance"]
      }
    ]
  },
  arts: {
    careers: [
      {
        name: "Journalist",
        match: 88,
        reasoning: "Strong communication skills and curiosity",
        stream: "Arts",
        courses: ["B.A Journalism", "B.A Mass Communication", "B.A English"]
      },
      {
        name: "Psychologist",
        match: 85,
        reasoning: "Interest in understanding human behavior",
        stream: "Arts",
        courses: ["B.A Psychology", "B.Sc Psychology", "B.A Social Work"]
      }
    ]
  }
};

// @route   GET /api/aptitude/questions
// @desc    Get aptitude test questions
// @access  Private
router.get('/questions', authMiddleware, async (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: {
        questions: aptitudeQuestions
      }
    });
  } catch (error) {
    console.error('Get questions error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch questions'
    });
  }
});

// @route   POST /api/aptitude/submit
// @desc    Submit aptitude test answers and get results
// @access  Private
router.post('/submit', [
  body('answers').isArray().withMessage('Answers must be an array'),
  body('answers.*.questionId').isInt().withMessage('Question ID must be an integer'),
  body('answers.*.answer').isInt({ min: 0, max: 3 }).withMessage('Answer must be between 0 and 3'),
  body('answers.*.category').isString().withMessage('Category must be a string')
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

    const { answers } = req.body;

    // Calculate scores by category
    const categoryScores = {};
    answers.forEach(answer => {
      if (!categoryScores[answer.category]) {
        categoryScores[answer.category] = [];
      }
      categoryScores[answer.category].push(answer.answer);
    });

    // Calculate average scores
    const averageScores = {};
    Object.keys(categoryScores).forEach(category => {
      const scores = categoryScores[category];
      averageScores[category] = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    });

    // Determine primary interest area
    let primaryInterest = 'technology';
    let maxScore = 0;

    // Simple scoring logic based on answers
    const interestScores = {
      technology: 0,
      science: 0,
      commerce: 0,
      arts: 0
    };

    answers.forEach(answer => {
      switch (answer.category) {
        case 'Interest':
          if (answer.answer === 0) interestScores.technology += 2;
          if (answer.answer === 1) interestScores.arts += 2;
          if (answer.answer === 2) interestScores.commerce += 2;
          if (answer.answer === 3) interestScores.arts += 1;
          break;
        case 'Academic Interest':
          if (answer.answer === 0) interestScores.science += 2;
          if (answer.answer === 1) interestScores.arts += 2;
          if (answer.answer === 2) interestScores.arts += 1;
          if (answer.answer === 3) interestScores.arts += 2;
          break;
        case 'Skill Development':
          if (answer.answer === 0) interestScores.technology += 2;
          if (answer.answer === 1) interestScores.commerce += 1;
          if (answer.answer === 2) interestScores.arts += 2;
          if (answer.answer === 3) interestScores.technology += 1;
          break;
        case 'Career Goals':
          if (answer.answer === 0) interestScores.science += 2;
          if (answer.answer === 1) interestScores.commerce += 2;
          if (answer.answer === 2) interestScores.technology += 2;
          if (answer.answer === 3) interestScores.arts += 2;
          break;
      }
    });

    // Find primary interest
    Object.keys(interestScores).forEach(interest => {
      if (interestScores[interest] > maxScore) {
        maxScore = interestScores[interest];
        primaryInterest = interest;
      }
    });

    // Get career recommendations
    const recommendations = careerRecommendations[primaryInterest] || careerRecommendations.technology;

    // Save test results to user profile
    const testResult = {
      testId: new Date().getTime(),
      score: Math.round((maxScore / 8) * 100), // Convert to percentage
      completedAt: new Date(),
      answers: answers
    };

    const careerRecs = recommendations.careers.map(career => ({
      career: career.name,
      matchPercentage: career.match,
      reasoning: career.reasoning,
      recommendedAt: new Date()
    }));

    // Update user profile
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        'aptitudeResults.testScores': testResult,
        'aptitudeResults.careerRecommendations': careerRecs
      }
    });

    res.status(200).json({
      status: 'success',
      data: {
        testResult: {
          score: testResult.score,
          primaryInterest,
          categoryScores: averageScores,
          completedAt: testResult.completedAt
        },
        recommendations: recommendations.careers,
        nextSteps: [
          "Explore recommended career paths in detail",
          "Find colleges offering relevant courses",
          "Connect with mentors in your field of interest",
          "Start building relevant skills"
        ]
      }
    });
  } catch (error) {
    console.error('Submit aptitude test error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to process test results'
    });
  }
});

// @route   GET /api/aptitude/results
// @desc    Get user's aptitude test results
// @access  Private
router.get('/results', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('aptitudeResults');
    
    if (!user.aptitudeResults || user.aptitudeResults.testScores.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'No aptitude test results found'
      });
    }

    const latestTest = user.aptitudeResults.testScores[user.aptitudeResults.testScores.length - 1];
    const latestRecommendations = user.aptitudeResults.careerRecommendations.slice(-2);

    res.status(200).json({
      status: 'success',
      data: {
        latestTest,
        recommendations: latestRecommendations,
        testHistory: user.aptitudeResults.testScores
      }
    });
  } catch (error) {
    console.error('Get aptitude results error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch test results'
    });
  }
});

// @route   GET /api/aptitude/analysis
// @desc    Get detailed analysis of user's aptitude
// @access  Private
router.get('/analysis', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('aptitudeResults');
    
    if (!user.aptitudeResults || user.aptitudeResults.testScores.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'No aptitude test results found'
      });
    }

    const allTests = user.aptitudeResults.testScores;
    const allRecommendations = user.aptitudeResults.careerRecommendations;

    // Calculate trends
    const scoreTrend = allTests.map(test => ({
      date: test.completedAt,
      score: test.score
    }));

    // Most recommended careers
    const careerFrequency = {};
    allRecommendations.forEach(rec => {
      careerFrequency[rec.career] = (careerFrequency[rec.career] || 0) + 1;
    });

    const topCareers = Object.entries(careerFrequency)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([career, count]) => ({ career, count }));

    // Strengths and areas for improvement
    const strengths = [
      "Strong analytical thinking",
      "Good problem-solving skills",
      "Effective communication abilities"
    ];

    const improvements = [
      "Develop technical skills",
      "Enhance leadership qualities",
      "Build industry-specific knowledge"
    ];

    res.status(200).json({
      status: 'success',
      data: {
        overview: {
          totalTests: allTests.length,
          averageScore: Math.round(allTests.reduce((sum, test) => sum + test.score, 0) / allTests.length),
          latestScore: allTests[allTests.length - 1].score,
          lastTestDate: allTests[allTests.length - 1].completedAt
        },
        trends: {
          scoreTrend,
          topCareers
        },
        insights: {
          strengths,
          improvements,
          recommendations: "Continue exploring your interests and consider taking specialized courses in your areas of strength."
        }
      }
    });
  } catch (error) {
    console.error('Get aptitude analysis error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch aptitude analysis'
    });
  }
});

module.exports = router;
