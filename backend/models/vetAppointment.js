const mongoose = require('mongoose');

const vetAppointmentSchema = new mongoose.Schema({
  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  veterinarian: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Veterinarian',
    required: true
  },
  serviceType: {
    type: String,
    required: true,
    enum: ['Consultation', 'Vaccination', 'Grooming', 'Emergency', 'Checkup']
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  appointmentTime: {
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
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'In Progress', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  notes: String,
  emergencyLevel: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Low'
  },
  estimatedDuration: {
    type: Number, // in minutes
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Refunded'],
    default: 'Pending'
  },
  feedback: {
    rating: Number,
    comment: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create geospatial index for location-based queries
vetAppointmentSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('VetAppointment', vetAppointmentSchema); 