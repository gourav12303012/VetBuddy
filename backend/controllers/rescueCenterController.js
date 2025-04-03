const RescueCenter = require('../models/rescueCenter');

// Create a new rescue center
exports.createRescueCenter = async (req, res) => {
  try {
    const {
      name,
      location,
      contact,
      operatingHours,
      capacity,
      facilities
    } = req.body;

    const rescueCenter = new RescueCenter({
      name,
      location,
      contact,
      operatingHours,
      capacity,
      facilities
    });

    await rescueCenter.save();

    res.status(201).json({
      success: true,
      data: rescueCenter
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get all rescue centers
exports.getRescueCenters = async (req, res) => {
  try {
    const rescueCenters = await RescueCenter.find();
    res.status(200).json({
      success: true,
      data: rescueCenters
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get nearby rescue centers
exports.getNearbyRescueCenters = async (req, res) => {
  try {
    const { longitude, latitude, maxDistance } = req.query;
    
    const rescueCenters = await RescueCenter.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: parseInt(maxDistance) || 10000 // Default 10km
        }
      }
    });

    res.status(200).json({
      success: true,
      data: rescueCenters
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Report a lost pet
exports.reportLostPet = async (req, res) => {
  try {
    const {
      petType,
      breed,
      color,
      lastSeen,
      description,
      contactInfo
    } = req.body;

    const rescueCenter = await RescueCenter.findById(req.params.id);
    if (!rescueCenter) {
      return res.status(404).json({
        success: false,
        error: 'Rescue center not found'
      });
    }

    rescueCenter.lostPets.push({
      petType,
      breed,
      color,
      lastSeen,
      description,
      contactInfo,
      reportedBy: req.user._id
    });

    await rescueCenter.save();

    res.status(201).json({
      success: true,
      data: rescueCenter
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Update lost pet status
exports.updateLostPetStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const rescueCenter = await RescueCenter.findOneAndUpdate(
      {
        _id: req.params.centerId,
        'lostPets._id': req.params.petId
      },
      {
        $set: {
          'lostPets.$.status': status
        }
      },
      { new: true }
    );
    if (!rescueCenter) {
      return res.status(404).json({
        success: false,
        error: 'Rescue center or pet not found'
      });
    }
    res.status(200).json({
      success: true,
      data: rescueCenter
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Add pet for adoption
exports.addPetForAdoption = async (req, res) => {
  try {
    const {
      petType,
      breed,
      age,
      gender,
      description,
      medicalHistory
    } = req.body;

    const rescueCenter = await RescueCenter.findById(req.params.id);
    if (!rescueCenter) {
      return res.status(404).json({
        success: false,
        error: 'Rescue center not found'
      });
    }

    rescueCenter.availableForAdoption.push({
      petType,
      breed,
      age,
      gender,
      description,
      medicalHistory
    });

    await rescueCenter.save();

    res.status(201).json({
      success: true,
      data: rescueCenter
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Update adoption status
exports.updateAdoptionStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const rescueCenter = await RescueCenter.findOneAndUpdate(
      {
        _id: req.params.centerId,
        'availableForAdoption._id': req.params.petId
      },
      {
        $set: {
          'availableForAdoption.$.adoptionStatus': status
        }
      },
      { new: true }
    );
    if (!rescueCenter) {
      return res.status(404).json({
        success: false,
        error: 'Rescue center or pet not found'
      });
    }
    res.status(200).json({
      success: true,
      data: rescueCenter
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Add review for rescue center
exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const rescueCenter = await RescueCenter.findByIdAndUpdate(
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
    if (!rescueCenter) {
      return res.status(404).json({
        success: false,
        error: 'Rescue center not found'
      });
    }
    res.status(200).json({
      success: true,
      data: rescueCenter
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}; 