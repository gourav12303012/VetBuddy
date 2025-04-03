const mongoose = require('mongoose');

const veterinarianSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true
  },
  experience: {
    type: Number,
    required: true
  },
  availability: [{
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    startTime: String,
    endTime: String,
    isAvailable: Boolean
  }],
  currentLocation: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  serviceRadius: {
    type: Number,
    required: true,
    default: 10 // in kilometers
  },
  services: [{
    type: String,
    enum: ['Consultation', 'Vaccination', 'Grooming', 'Emergency', 'Checkup']
  }],
  rating: {
    type: Number,
    default: 0
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: Number,
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  isAvailable: {
    type: Boolean,
    default: true
  }
});

// Create geospatial index for location-based queries
veterinarianSchema.index({ currentLocation: '2dsphere' });

module.exports = mongoose.model('Veterinarian', veterinarianSchema); 