const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  phone: {
    type: String,
    match: [/^[6-9]\d{9}$/, 'Please provide a valid phone number']
  },
  dateOfBirth: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  class: {
    type: String,
    enum: ['10th', '11th', '12th', 'graduation', 'post-graduation']
  },
  stream: {
    type: String,
    enum: ['science', 'commerce', 'arts', 'engineering', 'medical', 'other']
  },
  location: {
    state: {
      type: String,
      required: [true, 'State is required']
    },
    city: {
      type: String,
      required: [true, 'City is required']
    },
    pincode: {
      type: String,
      match: [/^\d{6}$/, 'Please provide a valid pincode']
    }
  },
  preferences: {
    languages: [{
      type: String,
      enum: ['en', 'hi', 'ta', 'te', 'bn', 'gu', 'mr', 'kn', 'ml', 'or', 'pa', 'as']
    }],
    interests: [String],
    careerGoals: [String],
    budget: {
      min: Number,
      max: Number
    }
  },
  aptitudeResults: {
    testScores: [{
      testId: mongoose.Schema.Types.ObjectId,
      score: Number,
      completedAt: Date,
      answers: [{
        questionId: String,
        answer: Number,
        category: String
      }]
    }],
    careerRecommendations: [{
      career: String,
      matchPercentage: Number,
      reasoning: String,
      recommendedAt: Date
    }]
  },
  collegePreferences: {
    shortlisted: [{
      collegeId: mongoose.Schema.Types.ObjectId,
      addedAt: Date,
      notes: String
    }],
    applied: [{
      collegeId: mongoose.Schema.Types.ObjectId,
      appliedAt: Date,
      status: {
        type: String,
        enum: ['applied', 'under-review', 'accepted', 'rejected', 'waitlisted']
      }
    }]
  },
  profile: {
    avatar: String,
    bio: String,
    achievements: [String],
    skills: [String],
    socialLinks: {
      linkedin: String,
      github: String,
      portfolio: String
    }
  },
  notifications: {
    email: {
      type: Boolean,
      default: true
    },
    push: {
      type: Boolean,
      default: true
    },
    sms: {
      type: Boolean,
      default: false
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  lastLogin: Date,
  loginCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
userSchema.index({ email: 1 });
userSchema.index({ 'location.state': 1, 'location.city': 1 });
userSchema.index({ stream: 1, class: 1 });
userSchema.index({ createdAt: -1 });

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return this.name;
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to check password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Instance method to get public profile
userSchema.methods.getPublicProfile = function() {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.__v;
  return userObject;
};

// Static method to find users by location
userSchema.statics.findByLocation = function(state, city) {
  return this.find({
    'location.state': new RegExp(state, 'i'),
    'location.city': new RegExp(city, 'i')
  });
};

// Static method to find users by stream
userSchema.statics.findByStream = function(stream) {
  return this.find({ stream: stream });
};

module.exports = mongoose.model('User', userSchema);
