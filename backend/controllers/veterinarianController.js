const Veterinarian = require('../models/veterinarian');
const User = require('../models/user');

// Create a new veterinarian
exports.createVeterinarian = async (req, res) => {
  try {
    const {
      specialization,
      licenseNumber,
      experience,
      availability,
      currentLocation,
      serviceRadius,
      services
    } = req.body;

    const veterinarian = new Veterinarian({
      user: req.user._id,
      specialization,
      licenseNumber,
      experience,
      availability,
      currentLocation,
      serviceRadius,
      services
    });

    await veterinarian.save();

    // Update user role to veterinarian
    await User.findByIdAndUpdate(req.user._id, {
      role: 'veterinarian'
    });

    res.status(201).json({
      success: true,
      data: veterinarian
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get all veterinarians
exports.getVeterinarians = async (req, res) => {
  try {
    const veterinarians = await Veterinarian.find().populate('user', 'name email');
    res.status(200).json({
      success: true,
      data: veterinarians
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get nearby veterinarians
exports.getNearbyVeterinarians = async (req, res) => {
  try {
    const { longitude, latitude, maxDistance } = req.query;
    
    const veterinarians = await Veterinarian.find({
      currentLocation: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: parseInt(maxDistance) || 10000 // Default 10km
        }
      },
      isAvailable: true
    }).populate('user', 'name email');

    res.status(200).json({
      success: true,
      data: veterinarians
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get a single veterinarian
exports.getVeterinarian = async (req, res) => {
  try {
    const veterinarian = await Veterinarian.findById(req.params.id).populate('user', 'name email');
    if (!veterinarian) {
      return res.status(404).json({
        success: false,
        error: 'Veterinarian not found'
      });
    }
    res.status(200).json({
      success: true,
      data: veterinarian
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Update veterinarian information
exports.updateVeterinarian = async (req, res) => {
  try {
    const veterinarian = await Veterinarian.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!veterinarian) {
      return res.status(404).json({
        success: false,
        error: 'Veterinarian not found'
      });
    }
    res.status(200).json({
      success: true,
      data: veterinarian
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Update availability status
exports.updateAvailability = async (req, res) => {
  try {
    const { isAvailable } = req.body;
    const veterinarian = await Veterinarian.findByIdAndUpdate(
      req.params.id,
      { isAvailable },
      { new: true }
    );
    if (!veterinarian) {
      return res.status(404).json({
        success: false,
        error: 'Veterinarian not found'
      });
    }
    res.status(200).json({
      success: true,
      data: veterinarian
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Add review
exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const veterinarian = await Veterinarian.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          reviews: {
            user: req.user._id,
            rating,
            comment
          }
        }
      },
      { new: true }
    );
    if (!veterinarian) {
      return res.status(404).json({
        success: false,
        error: 'Veterinarian not found'
      });
    }
    res.status(200).json({
      success: true,
      data: veterinarian
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}; 