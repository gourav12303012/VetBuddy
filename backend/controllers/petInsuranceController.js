const PetInsurance = require('../models/petInsurance');
const Pet = require('../models/pet');

// Create a new pet insurance policy
exports.createInsurancePolicy = async (req, res) => {
  try {
    const {
      pet,
      provider,
      policyNumber,
      coverageType,
      startDate,
      endDate,
      premium,
      coverageDetails,
      deductible,
      coPayment,
      maximumCoverage,
      exclusions
    } = req.body;

    const insurancePolicy = new PetInsurance({
      pet,
      owner: req.user._id,
      provider,
      policyNumber,
      coverageType,
      startDate,
      endDate,
      premium,
      coverageDetails,
      deductible,
      coPayment,
      maximumCoverage,
      exclusions
    });

    await insurancePolicy.save();

    // Update pet's insurance information
    await Pet.findByIdAndUpdate(pet, {
      insurance: {
        provider,
        policyNumber,
        expiryDate: endDate
      }
    });

    res.status(201).json({
      success: true,
      data: insurancePolicy
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get all insurance policies for a user
exports.getUserInsurancePolicies = async (req, res) => {
  try {
    const insurancePolicies = await PetInsurance.find({ owner: req.user._id })
      .populate('pet');
    res.status(200).json({
      success: true,
      data: insurancePolicies
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get a single insurance policy
exports.getInsurancePolicy = async (req, res) => {
  try {
    const insurancePolicy = await PetInsurance.findById(req.params.id)
      .populate('pet');
    if (!insurancePolicy) {
      return res.status(404).json({
        success: false,
        error: 'Insurance policy not found'
      });
    }
    res.status(200).json({
      success: true,
      data: insurancePolicy
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// File a claim
exports.fileClaim = async (req, res) => {
  try {
    const {
      type,
      description,
      amount,
      documents,
      veterinarian
    } = req.body;

    const insurancePolicy = await PetInsurance.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          claims: {
            type,
            description,
            amount,
            documents,
            veterinarian
          }
        }
      },
      { new: true }
    );
    if (!insurancePolicy) {
      return res.status(404).json({
        success: false,
        error: 'Insurance policy not found'
      });
    }
    res.status(201).json({
      success: true,
      data: insurancePolicy
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Update claim status
exports.updateClaimStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const insurancePolicy = await PetInsurance.findOneAndUpdate(
      {
        _id: req.params.id,
        'claims._id': req.params.claimId
      },
      {
        $set: {
          'claims.$.status': status
        }
      },
      { new: true }
    );
    if (!insurancePolicy) {
      return res.status(404).json({
        success: false,
        error: 'Insurance policy or claim not found'
      });
    }
    res.status(200).json({
      success: true,
      data: insurancePolicy
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Renew insurance policy
exports.renewInsurancePolicy = async (req, res) => {
  try {
    const { endDate, premium } = req.body;
    const insurancePolicy = await PetInsurance.findByIdAndUpdate(
      req.params.id,
      {
        endDate,
        premium,
        renewalStatus: 'Active'
      },
      { new: true }
    );
    if (!insurancePolicy) {
      return res.status(404).json({
        success: false,
        error: 'Insurance policy not found'
      });
    }

    // Update pet's insurance expiry date
    await Pet.findByIdAndUpdate(insurancePolicy.pet, {
      'insurance.expiryDate': endDate
    });

    res.status(200).json({
      success: true,
      data: insurancePolicy
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Cancel insurance policy
exports.cancelInsurancePolicy = async (req, res) => {
  try {
    const insurancePolicy = await PetInsurance.findByIdAndUpdate(
      req.params.id,
      {
        renewalStatus: 'Cancelled'
      },
      { new: true }
    );
    if (!insurancePolicy) {
      return res.status(404).json({
        success: false,
        error: 'Insurance policy not found'
      });
    }

    // Remove insurance from pet's record
    await Pet.findByIdAndUpdate(insurancePolicy.pet, {
      $unset: { insurance: 1 }
    });

    res.status(200).json({
      success: true,
      data: insurancePolicy
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}; 