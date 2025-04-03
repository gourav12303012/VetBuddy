const mongoose = require('mongoose');

const petInsuranceSchema = new mongoose.Schema({
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
  provider: {
    type: String,
    required: true
  },
  policyNumber: {
    type: String,
    required: true,
    unique: true
  },
  coverageType: {
    type: String,
    required: true,
    enum: ['Basic', 'Standard', 'Premium', 'Comprehensive']
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  premium: {
    amount: {
      type: Number,
      required: true
    },
    frequency: {
      type: String,
      enum: ['Monthly', 'Quarterly', 'Annual'],
      default: 'Monthly'
    }
  },
  coverageDetails: {
    accidents: Boolean,
    illnesses: Boolean,
    routineCare: Boolean,
    dental: Boolean,
    prescriptionMedication: Boolean,
    alternativeTherapies: Boolean
  },
  claims: [{
    date: {
      type: Date,
      default: Date.now
    },
    type: {
      type: String,
      required: true
    },
    description: String,
    amount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected', 'Paid'],
      default: 'Pending'
    },
    documents: [String],
    veterinarian: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Veterinarian'
    }
  }],
  deductible: {
    type: Number,
    required: true
  },
  coPayment: {
    type: Number,
    required: true
  },
  maximumCoverage: {
    type: Number,
    required: true
  },
  exclusions: [String],
  renewalStatus: {
    type: String,
    enum: ['Active', 'Pending Renewal', 'Expired', 'Cancelled'],
    default: 'Active'
  }
});

module.exports = mongoose.model('PetInsurance', petInsuranceSchema); 