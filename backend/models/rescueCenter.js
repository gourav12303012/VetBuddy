const mongoose = require('mongoose');

const rescueCenterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    },
    address: String
  },
  contact: {
    phone: String,
    email: String,
    website: String
  },
  operatingHours: {
    open: String,
    close: String,
    days: [String]
  },
  capacity: {
    type: Number,
    required: true
  },
  currentOccupancy: {
    type: Number,
    default: 0
  },
  facilities: [String],
  lostPets: [{
    petType: String,
    breed: String,
    color: String,
    lastSeen: {
      location: {
        type: {
          type: String,
          enum: ['Point'],
          default: 'Point'
        },
        coordinates: [Number],
        address: String
      },
      date: Date
    },
    description: String,
    contactInfo: String,
    status: {
      type: String,
      enum: ['Missing', 'Found', 'Reunited'],
      default: 'Missing'
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reportedAt: {
      type: Date,
      default: Date.now
    }
  }],
  availableForAdoption: [{
    petType: String,
    breed: String,
    age: Number,
    gender: String,
    description: String,
    medicalHistory: String,
    adoptionStatus: {
      type: String,
      enum: ['Available', 'Pending', 'Adopted'],
      default: 'Available'
    }
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
  }]
});

// Create geospatial index for location-based queries
rescueCenterSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('RescueCenter', rescueCenterSchema); 