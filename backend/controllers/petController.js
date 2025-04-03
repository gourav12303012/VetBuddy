const Pet = require('../models/pet');
const User = require('../models/user');

// Create a new pet
exports.createPet = async (req, res) => {
  try {
    const { name, species, breed, age, weight, medicalHistory, vaccinationRecords, insurance } = req.body;
    
    const pet = new Pet({
      owner: req.user._id,
      name,
      species,
      breed,
      age,
      weight,
      medicalHistory,
      vaccinationRecords,
      insurance
    });

    await pet.save();
    
    // Add pet to user's pets array
    await User.findByIdAndUpdate(req.user._id, {
      $push: { pets: pet._id }
    });

    res.status(201).json({
      success: true,
      data: pet
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get all pets for a user
exports.getUserPets = async (req, res) => {
  try {
    const pets = await Pet.find({ owner: req.user._id });
    res.status(200).json({
      success: true,
      data: pets
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get a single pet
exports.getPet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({
        success: false,
        error: 'Pet not found'
      });
    }
    res.status(200).json({
      success: true,
      data: pet
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Update pet information
exports.updatePet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!pet) {
      return res.status(404).json({
        success: false,
        error: 'Pet not found'
      });
    }
    res.status(200).json({
      success: true,
      data: pet
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Delete a pet
exports.deletePet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet) {
      return res.status(404).json({
        success: false,
        error: 'Pet not found'
      });
    }
    
    // Remove pet from user's pets array
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { pets: pet._id }
    });

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Add medical history
exports.addMedicalHistory = async (req, res) => {
  try {
    const { date, condition, treatment, notes } = req.body;
    const pet = await Pet.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          medicalHistory: {
            date,
            condition,
            treatment,
            notes
          }
        }
      },
      { new: true }
    );
    if (!pet) {
      return res.status(404).json({
        success: false,
        error: 'Pet not found'
      });
    }
    res.status(200).json({
      success: true,
      data: pet
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Add vaccination record
exports.addVaccinationRecord = async (req, res) => {
  try {
    const { vaccineName, dateAdministered, nextDueDate, administeredBy } = req.body;
    const pet = await Pet.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          vaccinationRecords: {
            vaccineName,
            dateAdministered,
            nextDueDate,
            administeredBy
          }
        }
      },
      { new: true }
    );
    if (!pet) {
      return res.status(404).json({
        success: false,
        error: 'Pet not found'
      });
    }
    res.status(200).json({
      success: true,
      data: pet
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}; 