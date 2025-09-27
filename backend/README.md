# Career Guidance Platform - Backend

A robust Node.js backend API for the Career Guidance Platform, built with Express.js and MongoDB.

## 🚀 Features

- **RESTful API**: Well-structured API endpoints
- **Authentication**: JWT-based authentication system
- **Database**: MongoDB with Mongoose ODM
- **Caching**: Redis for performance optimization
- **Real-time**: Socket.io for live features
- **AI Integration**: OpenAI API for chatbot functionality
- **Security**: Comprehensive security middleware
- **Validation**: Input validation and sanitization
- **Error Handling**: Centralized error management
- **Logging**: Structured logging with Morgan

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Primary database
- **Mongoose** - MongoDB ODM
- **Redis** - Caching and session management
- **JWT** - Authentication tokens
- **Socket.io** - Real-time communication
- **OpenAI** - AI chatbot integration
- **Firebase Admin** - Push notifications
- **Resend** - Email services
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API rate limiting
- **Express Validator** - Input validation

## 📁 Project Structure

```
backend/
├── config/                 # Configuration files
│   ├── database.js        # MongoDB connection
│   └── redis.js           # Redis connection
├── middleware/            # Custom middleware
│   ├── auth.js           # Authentication middleware
│   └── errorHandler.js   # Error handling middleware
├── models/               # Database models
│   ├── User.js          # User model
│   └── College.js       # College model
├── routes/              # API routes
│   ├── auth.js         # Authentication routes
│   ├── users.js        # User management routes
│   ├── aptitude.js     # Aptitude test routes
│   ├── colleges.js     # College directory routes
│   ├── career.js       # Career guidance routes
│   ├── chatbot.js      # AI chatbot routes
│   ├── notifications.js # Notification routes
│   └── mentorship.js   # Mentorship routes
├── utils/              # Utility functions
├── uploads/            # File uploads
├── server.js          # Main server file
├── package.json       # Dependencies
└── .env.example       # Environment variables template
```

## 🗄️ Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  dateOfBirth: Date,
  gender: String,
  class: String,
  stream: String,
  location: {
    state: String,
    city: String,
    pincode: String
  },
  preferences: {
    languages: [String],
    interests: [String],
    careerGoals: [String],
    budget: { min: Number, max: Number }
  },
  aptitudeResults: {
    testScores: [Object],
    careerRecommendations: [Object]
  },
  collegePreferences: {
    shortlisted: [Object],
    applied: [Object]
  },
  profile: {
    avatar: String,
    bio: String,
    achievements: [String],
    skills: [String]
  },
  notifications: {
    email: Boolean,
    push: Boolean,
    sms: Boolean
  },
  isActive: Boolean,
  isVerified: Boolean,
  lastLogin: Date,
  loginCount: Number
}
```

### College Model
```javascript
{
  name: String,
  type: String,
  location: {
    address: String,
    city: String,
    state: String,
    pincode: String,
    coordinates: { latitude: Number, longitude: Number }
  },
  contact: {
    phone: String,
    email: String,
    website: String
  },
  academic: {
    established: Number,
    accreditation: [Object],
    ranking: Object,
    studentCapacity: { total: Number, current: Number }
  },
  courses: [{
    name: String,
    stream: String,
    level: String,
    duration: String,
    fees: { annual: { min: Number, max: Number } },
    eligibility: Object,
    seats: Object
  }],
  facilities: {
    academic: [String],
    residential: [String],
    sports: [String],
    other: [String]
  },
  admission: {
    process: String,
    importantDates: [Object],
    cutoffs: [Object],
    documents: [String]
  },
  scholarships: [Object],
  placement: Object,
  images: [Object],
  reviews: [Object],
  averageRating: Number,
  isActive: Boolean,
  isVerified: Boolean
}
```

## 🔌 API Endpoints

### Authentication
```
POST /api/auth/register     # User registration
POST /api/auth/login        # User login
POST /api/auth/logout       # User logout
GET  /api/auth/me          # Get current user
POST /api/auth/forgot-password # Password reset request
POST /api/auth/reset-password  # Password reset
```

### Users
```
GET    /api/users/profile           # Get user profile
PUT    /api/users/profile           # Update user profile
POST   /api/users/colleges/shortlist # Add college to shortlist
DELETE /api/users/colleges/shortlist/:id # Remove from shortlist
GET    /api/users/colleges/shortlist # Get shortlisted colleges
POST   /api/users/colleges/apply    # Mark college as applied
GET    /api/users/colleges/applications # Get applications
GET    /api/users/dashboard         # Get dashboard data
DELETE /api/users/account           # Delete account
```

### Aptitude Test
```
GET  /api/aptitude/questions    # Get test questions
POST /api/aptitude/submit       # Submit test answers
GET  /api/aptitude/results      # Get test results
GET  /api/aptitude/analysis     # Get detailed analysis
```

### Colleges
```
GET  /api/colleges              # Get colleges with filters
GET  /api/colleges/:id          # Get college details
GET  /api/colleges/search/suggestions # Get search suggestions
GET  /api/colleges/nearby       # Get nearby colleges
GET  /api/colleges/top-rated    # Get top rated colleges
GET  /api/colleges/stats/overview # Get college statistics
```

### Career Guidance
```
GET  /api/career/paths          # Get career paths by stream
GET  /api/career/paths/:id      # Get specific career details
GET  /api/career/recommendations # Get personalized recommendations
GET  /api/career/trends         # Get career trends and insights
```

### AI Chatbot
```
POST /api/chatbot/chat          # Chat with AI assistant
GET  /api/chatbot/history       # Get chat history
DELETE /api/chatbot/history     # Clear chat history
GET  /api/chatbot/suggestions   # Get conversation starters
```

### Notifications
```
GET    /api/notifications              # Get user notifications
POST   /api/notifications/mark-read    # Mark notifications as read
DELETE /api/notifications/:id          # Delete notification
POST   /api/notifications/clear-all    # Clear all notifications
GET    /api/notifications/preferences  # Get notification preferences
PUT    /api/notifications/preferences  # Update preferences
```

### Mentorship
```
GET  /api/mentorship/mentors           # Get available mentors
GET  /api/mentorship/mentors/:id       # Get mentor details
POST /api/mentorship/sessions/request  # Request mentorship session
GET  /api/mentorship/sessions          # Get user sessions
GET  /api/mentorship/sessions/:id      # Get session details
PUT  /api/mentorship/sessions/:id/cancel # Cancel session
POST /api/mentorship/sessions/:id/feedback # Submit feedback
GET  /api/mentorship/availability/:mentorId # Get mentor availability
```

## 🔧 Configuration

### Environment Variables
```env
# Server Configuration
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/career_guidance
REDIS_URL=redis://localhost:6379

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your_refresh_token_secret_here
JWT_REFRESH_EXPIRE=30d

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Firebase Configuration
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY=your_firebase_private_key
FIREBASE_CLIENT_EMAIL=your_firebase_client_email

# Email Configuration
RESEND_API_KEY=your_resend_api_key_here
FROM_EMAIL=noreply@careerguide.in

# Google Maps API
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# Government APIs
GOVERNMENT_API_BASE_URL=https://api.gov.in
GOVERNMENT_API_KEY=your_government_api_key_here

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB
- Redis
- OpenAI API key
- Google Maps API key

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **API will be available at**
   ```
   http://localhost:5000
   ```

### Production Setup

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

## 🔒 Security Features

### Authentication & Authorization
- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Session management

### Security Middleware
- Helmet for security headers
- CORS configuration
- Rate limiting
- Input validation and sanitization
- XSS protection
- MongoDB injection prevention

### Data Protection
- Password encryption
- Secure token storage
- Input sanitization
- SQL injection prevention

## 📊 Performance Optimizations

### Caching Strategy
- Redis for session storage
- API response caching
- Database query optimization
- Static asset caching

### Database Optimization
- Indexed queries
- Aggregation pipelines
- Connection pooling
- Query optimization

## 🧪 Testing

### Test Structure
```
tests/
├── unit/           # Unit tests
├── integration/    # Integration tests
├── e2e/           # End-to-end tests
└── fixtures/      # Test data
```

### Test Commands
```bash
npm test           # Run all tests
npm run test:unit  # Run unit tests
npm run test:integration # Run integration tests
npm run test:e2e   # Run E2E tests
npm run test:watch # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

## 📈 Monitoring & Logging

### Logging
- Morgan for HTTP request logging
- Winston for application logging
- Error tracking with Sentry
- Performance monitoring

### Health Checks
```
GET /health        # Basic health check
GET /health/detailed # Detailed system status
```

## 🔄 Real-time Features

### Socket.io Integration
- Real-time notifications
- Live chat functionality
- Mentorship sessions
- Collaborative features

### WebSocket Events
```javascript
// Client events
'join-room'
'leave-room'
'send-message'
'typing-start'
'typing-stop'

// Server events
'notification'
'message-received'
'user-joined'
'user-left'
'typing'
```

## 🤖 AI Integration

### OpenAI Integration
- GPT-3.5-turbo for chatbot
- Context-aware responses
- Conversation history
- Suggested actions

### AI Features
- Career guidance chatbot
- Personalized recommendations
- Natural language processing
- Response analysis

## 📧 External Services

### Email Service (Resend)
- User registration emails
- Password reset emails
- Notification emails
- Marketing emails

### Push Notifications (Firebase)
- Real-time notifications
- Cross-platform support
- Targeted messaging
- Analytics tracking

### Maps Integration (Google Maps)
- College location services
- Distance calculations
- Geocoding services
- Place details

## 🚀 Deployment

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### Environment-specific Configs
- Development: Local MongoDB, Redis
- Staging: Cloud databases, limited resources
- Production: High availability, monitoring

### Deployment Platforms
- **Railway** (Recommended)
- **Heroku**
- **AWS EC2**
- **DigitalOcean**
- **Google Cloud Platform**

## 📊 API Documentation

### Swagger/OpenAPI
- Interactive API documentation
- Request/response examples
- Authentication details
- Error codes

### Postman Collection
- Pre-configured requests
- Environment variables
- Test scripts
- Documentation

## 🔧 Development Tools

### Code Quality
- ESLint configuration
- Prettier formatting
- Husky git hooks
- Lint-staged

### Debugging
- Node.js debugger
- MongoDB Compass
- Redis Commander
- API testing tools

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ for the future of Indian education**
