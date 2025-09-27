const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'College name is required'],
    trim: true,
    maxlength: [100, 'College name cannot be more than 100 characters']
  },
  type: {
    type: String,
    required: [true, 'College type is required'],
    enum: ['Central University', 'State University', 'Deemed University', 'Private University', 'Government College', 'Autonomous College']
  },
  location: {
    address: {
      type: String,
      required: [true, 'Address is required']
    },
    city: {
      type: String,
      required: [true, 'City is required']
    },
    state: {
      type: String,
      required: [true, 'State is required']
    },
    pincode: {
      type: String,
      required: [true, 'Pincode is required'],
      match: [/^\d{6}$/, 'Please provide a valid pincode']
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  contact: {
    phone: {
      type: String,
      match: [/^[6-9]\d{9}$/, 'Please provide a valid phone number']
    },
    email: {
      type: String,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email'
      ]
    },
    website: String,
    admissionOffice: {
      phone: String,
      email: String
    }
  },
  academic: {
    established: {
      type: Number,
      required: [true, 'Establishment year is required']
    },
    accreditation: [{
      body: String,
      grade: String,
      validUntil: Date
    }],
    ranking: {
      nirf: Number,
      other: [{
        body: String,
        rank: Number,
        year: Number
      }]
    },
    studentCapacity: {
      total: Number,
      current: Number
    }
  },
  courses: [{
    name: {
      type: String,
      required: true
    },
    stream: {
      type: String,
      enum: ['science', 'commerce', 'arts', 'engineering', 'medical', 'management', 'law', 'pharmacy', 'other'],
      required: true
    },
    level: {
      type: String,
      enum: ['undergraduate', 'postgraduate', 'diploma', 'certificate', 'phd'],
      required: true
    },
    duration: {
      type: String,
      required: true
    },
    fees: {
      annual: {
        min: Number,
        max: Number
      },
      semester: {
        min: Number,
        max: Number
      }
    },
    eligibility: {
      minPercentage: Number,
      subjects: [String],
      entranceExam: [String]
    },
    seats: {
      total: Number,
      general: Number,
      reserved: {
        sc: Number,
        st: Number,
        obc: Number,
        ews: Number
      }
    }
  }],
  facilities: {
    academic: [{
      type: String,
      enum: ['library', 'laboratory', 'computer-lab', 'research-center', 'auditorium', 'seminar-hall']
    }],
    residential: [{
      type: String,
      enum: ['hostel', 'mess', 'cafeteria', 'guest-house']
    }],
    sports: [{
      type: String,
      enum: ['gymnasium', 'playground', 'swimming-pool', 'tennis-court', 'basketball-court', 'cricket-ground']
    }],
    other: [{
      type: String,
      enum: ['wifi', 'transport', 'medical', 'bank', 'atm', 'post-office', 'bookstore']
    }]
  },
  admission: {
    process: {
      type: String,
      enum: ['merit-based', 'entrance-exam', 'counseling', 'interview', 'combination']
    },
    importantDates: [{
      event: String,
      date: Date,
      description: String
    }],
    cutoffs: [{
      course: String,
      year: Number,
      category: {
        type: String,
        enum: ['general', 'sc', 'st', 'obc', 'ews']
      },
      percentage: Number
    }],
    documents: [String]
  },
  scholarships: [{
    name: String,
    type: {
      type: String,
      enum: ['merit-based', 'need-based', 'category-based', 'sports', 'cultural']
    },
    amount: {
      min: Number,
      max: Number
    },
    eligibility: String,
    applicationProcess: String,
    deadline: Date
  }],
  placement: {
    averagePackage: Number,
    highestPackage: Number,
    placementPercentage: Number,
    topRecruiters: [String],
    statistics: [{
      year: Number,
      totalOffers: Number,
      averagePackage: Number,
      highestPackage: Number
    }]
  },
  images: [{
    url: String,
    caption: String,
    type: {
      type: String,
      enum: ['campus', 'building', 'facility', 'event', 'other']
    }
  }],
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String,
    categories: {
      academics: Number,
      infrastructure: Number,
      faculty: Number,
      placement: Number,
      valueForMoney: Number
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
collegeSchema.index({ name: 'text', 'location.city': 'text', 'location.state': 'text' });
collegeSchema.index({ 'location.state': 1, 'location.city': 1 });
collegeSchema.index({ 'courses.stream': 1 });
collegeSchema.index({ 'academic.established': -1 });
collegeSchema.index({ averageRating: -1 });
collegeSchema.index({ 'admission.importantDates.date': 1 });

// Virtual for total courses
collegeSchema.virtual('totalCourses').get(function() {
  return this.courses.length;
});

// Virtual for total facilities
collegeSchema.virtual('totalFacilities').get(function() {
  const academic = this.facilities.academic ? this.facilities.academic.length : 0;
  const residential = this.facilities.residential ? this.facilities.residential.length : 0;
  const sports = this.facilities.sports ? this.facilities.sports.length : 0;
  const other = this.facilities.other ? this.facilities.other.length : 0;
  return academic + residential + sports + other;
});

// Pre-save middleware to update average rating
collegeSchema.pre('save', function(next) {
  if (this.reviews && this.reviews.length > 0) {
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    this.averageRating = Math.round((totalRating / this.reviews.length) * 10) / 10;
  }
  this.lastUpdated = new Date();
  next();
});

// Static method to find colleges by location
collegeSchema.statics.findByLocation = function(state, city) {
  const query = {};
  if (state) query['location.state'] = new RegExp(state, 'i');
  if (city) query['location.city'] = new RegExp(city, 'i');
  return this.find(query);
};

// Static method to find colleges by stream
collegeSchema.statics.findByStream = function(stream) {
  return this.find({ 'courses.stream': stream });
};

// Static method to find colleges by course
collegeSchema.statics.findByCourse = function(courseName) {
  return this.find({ 'courses.name': new RegExp(courseName, 'i') });
};

// Static method to get top rated colleges
collegeSchema.statics.getTopRated = function(limit = 10) {
  return this.find({ isActive: true })
    .sort({ averageRating: -1 })
    .limit(limit);
};

// Instance method to add review
collegeSchema.methods.addReview = function(userId, rating, comment, categories) {
  this.reviews.push({
    user: userId,
    rating,
    comment,
    categories,
    createdAt: new Date()
  });
  return this.save();
};

module.exports = mongoose.model('College', collegeSchema);
