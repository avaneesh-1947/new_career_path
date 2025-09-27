const express = require('express');
const { body, validationResult } = require('express-validator');
const OpenAI = require('openai');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Initialize OpenAI (only if API key is available)
let openai = null;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
}

// Chat history storage (in production, use Redis or database)
const chatHistory = new Map();

// @route   POST /api/chatbot/chat
// @desc    Chat with AI career guidance bot
// @access  Private
router.post('/chat', [
  body('message').notEmpty().withMessage('Message is required'),
  body('context').optional().isObject().withMessage('Context must be an object')
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

    const { message, context = {} } = req.body;
    const userId = req.user._id.toString();

    // Get or create chat history for user
    if (!chatHistory.has(userId)) {
      chatHistory.set(userId, []);
    }

    const userHistory = chatHistory.get(userId);

    // Prepare system prompt
    const systemPrompt = `You are CareerGenie, an AI career guidance assistant for Indian students. Your role is to:

1. Provide personalized career guidance based on student's interests, academic background, and goals
2. Help students understand different career paths, educational requirements, and job prospects
3. Suggest relevant courses, colleges, and skill development opportunities
4. Answer questions about admissions, scholarships, and career planning
5. Be encouraging, supportive, and culturally sensitive to Indian education system

User Context:
- Name: ${req.user.name}
- Class: ${req.user.class || 'Not specified'}
- Stream: ${req.user.stream || 'Not specified'}
- Location: ${req.user.location?.state || 'Not specified'}, ${req.user.location?.city || 'Not specified'}

Guidelines:
- Keep responses concise but informative (2-3 paragraphs max)
- Use simple, friendly language
- Focus on actionable advice
- Mention specific Indian colleges, courses, and opportunities when relevant
- If you don't know something, admit it and suggest where to find the information
- Always encourage the student to explore their interests and take aptitude tests

Current conversation context: ${JSON.stringify(context)}`;

    // Prepare messages for OpenAI
    const messages = [
      { role: 'system', content: systemPrompt },
      ...userHistory.slice(-10), // Keep last 10 messages for context
      { role: 'user', content: message }
    ];

    // Call OpenAI API (if available) or use fallback response
    let aiResponse;
    if (openai) {
      try {
        const completion = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: messages,
          max_tokens: 500,
          temperature: 0.7,
          presence_penalty: 0.1,
          frequency_penalty: 0.1
        });
        aiResponse = completion.choices[0].message.content;
      } catch (error) {
        console.error('OpenAI API error:', error);
        aiResponse = generateFallbackResponse(inputMessage);
      }
    } else {
      aiResponse = generateFallbackResponse(inputMessage);
    }

    // Update chat history
    userHistory.push(
      { role: 'user', content: message },
      { role: 'assistant', content: aiResponse }
    );

    // Keep only last 20 messages to manage memory
    if (userHistory.length > 20) {
      userHistory.splice(0, userHistory.length - 20);
    }

    // Analyze response for suggested actions
    const suggestedActions = analyzeResponseForActions(aiResponse, message);

    res.status(200).json({
      status: 'success',
      data: {
        response: aiResponse,
        suggestedActions,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Chatbot error:', error);
    
    if (error.code === 'insufficient_quota') {
      return res.status(503).json({
        status: 'error',
        message: 'AI service temporarily unavailable. Please try again later.'
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Failed to process your message. Please try again.'
    });
  }
});

// @route   GET /api/chatbot/history
// @desc    Get chat history for user
// @access  Private
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const history = chatHistory.get(userId) || [];

    res.status(200).json({
      status: 'success',
      data: {
        history: history.slice(-20), // Return last 20 messages
        totalMessages: history.length
      }
    });
  } catch (error) {
    console.error('Get chat history error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch chat history'
    });
  }
});

// @route   DELETE /api/chatbot/history
// @desc    Clear chat history for user
// @access  Private
router.delete('/history', authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id.toString();
    chatHistory.delete(userId);

    res.status(200).json({
      status: 'success',
      message: 'Chat history cleared successfully'
    });
  } catch (error) {
    console.error('Clear chat history error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to clear chat history'
    });
  }
});

// @route   GET /api/chatbot/suggestions
// @desc    Get conversation starter suggestions
// @access  Private
router.get('/suggestions', authMiddleware, async (req, res) => {
  try {
    const suggestions = [
      "What career options are available for science stream students?",
      "How do I choose between engineering and medicine?",
      "What are the best government colleges for computer science?",
      "How can I improve my chances of getting into IIT?",
      "What skills should I develop for a career in data science?",
      "Tell me about scholarship opportunities for undergraduate students",
      "What is the difference between B.Tech and B.Sc in computer science?",
      "How do I prepare for competitive exams like JEE and NEET?",
      "What are the career prospects in the field of artificial intelligence?",
      "How can I find internships related to my field of interest?"
    ];

    // Shuffle suggestions and return 5 random ones
    const shuffled = suggestions.sort(() => 0.5 - Math.random());
    const selectedSuggestions = shuffled.slice(0, 5);

    res.status(200).json({
      status: 'success',
      data: {
        suggestions: selectedSuggestions
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

// Fallback response function when OpenAI is not available
function generateFallbackResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('career') && lowerMessage.includes('science')) {
    return "Great question! For science stream students, there are numerous exciting career paths available:\n\n**Engineering Fields:**\n- Software Engineering (High demand, ₹6-15 LPA)\n- Data Science (Growing field, ₹8-20 LPA)\n- Biotechnology (Research opportunities)\n\n**Medical Fields:**\n- Medicine (MBBS, MD)\n- Dentistry (BDS)\n- Pharmacy (B.Pharm)\n\n**Pure Sciences:**\n- Research Scientist\n- Environmental Science\n- Physics/Chemistry research\n\nI'd recommend taking our aptitude test to get personalized career recommendations based on your interests and strengths. Would you like to explore any specific field in detail?";
  }
  
  if (lowerMessage.includes('engineering') && lowerMessage.includes('medicine')) {
    return "This is a common dilemma! Here's how to decide between Engineering and Medicine:\n\n**Choose Engineering if:**\n- You enjoy problem-solving and technology\n- You prefer structured, logical thinking\n- You want faster career entry (4 years vs 5.5+ years)\n- You're interested in innovation and building things\n\n**Choose Medicine if:**\n- You have a strong desire to help people directly\n- You're comfortable with long study periods\n- You enjoy biology and human anatomy\n- You want a stable, respected profession\n\n**Consider:**\n- Your aptitude test results\n- Your interests and personality\n- Career goals and lifestyle preferences\n- Financial considerations\n\nWould you like to take our aptitude test to get personalized insights?";
  }
  
  if (lowerMessage.includes('college') && lowerMessage.includes('computer science')) {
    return "Excellent choice! Computer Science is a highly sought-after field. Here are some top government colleges for CS:\n\n**IITs (Most Prestigious):**\n- IIT Delhi, Bombay, Madras, Kanpur\n- Cut-off: 99+ percentile in JEE Advanced\n- Fees: ₹2-3 LPA\n\n**NITs:**\n- NIT Trichy, Warangal, Surathkal\n- Cut-off: 95+ percentile in JEE Main\n- Fees: ₹1.5-2 LPA\n\n**State Universities:**\n- Delhi University (B.Sc CS)\n- Anna University, Chennai\n- Jadavpur University, Kolkata\n\n**Admission Process:**\n- JEE Main/Advanced for IITs/NITs\n- University-specific entrance exams\n- Merit-based for some colleges\n\nWould you like me to help you find colleges near your location or explain the admission process?";
  }
  
  return "That's an interesting question! I'd be happy to help you with that. Could you provide a bit more context about your specific situation? For example:\n\n- What's your current academic background?\n- What are your main interests?\n- What are your career goals?\n- Any specific concerns or challenges you're facing?\n\nThe more details you share, the better I can assist you with personalized guidance. You can also take our aptitude test to get comprehensive career recommendations based on your interests and strengths.";
}

// Helper function to analyze response for suggested actions
function analyzeResponseForActions(response, userMessage) {
  const actions = [];
  const lowerResponse = response.toLowerCase();
  const lowerMessage = userMessage.toLowerCase();

  // Check for career-related queries
  if (lowerMessage.includes('career') || lowerMessage.includes('job') || lowerMessage.includes('profession')) {
    actions.push({
      type: 'navigate',
      label: 'Explore Career Paths',
      url: '/career-mapping'
    });
  }

  // Check for college-related queries
  if (lowerMessage.includes('college') || lowerMessage.includes('university') || lowerMessage.includes('admission')) {
    actions.push({
      type: 'navigate',
      label: 'Find Colleges',
      url: '/colleges'
    });
  }

  // Check for aptitude test suggestions
  if (lowerMessage.includes('interest') || lowerMessage.includes('aptitude') || lowerMessage.includes('test')) {
    actions.push({
      type: 'navigate',
      label: 'Take Aptitude Test',
      url: '/aptitude-test'
    });
  }

  // Check for skill development suggestions
  if (lowerResponse.includes('skill') || lowerResponse.includes('learn') || lowerResponse.includes('develop')) {
    actions.push({
      type: 'external',
      label: 'Skill Development Resources',
      url: 'https://www.coursera.org'
    });
  }

  // Check for scholarship mentions
  if (lowerResponse.includes('scholarship') || lowerResponse.includes('financial aid')) {
    actions.push({
      type: 'navigate',
      label: 'View Scholarships',
      url: '/scholarships'
    });
  }

  return actions;
}

module.exports = router;
