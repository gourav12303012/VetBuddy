const VetAppointment = require('../models/vetAppointment');
const Pet = require('../models/pet');
const Veterinarian = require('../models/veterinarian');

// Create a new appointment
exports.createAppointment = async (req, res) => {
  try {
    const {
      pet,
      veterinarian,
      serviceType,
      appointmentDate,
      appointmentTime,
      location,
      notes,
      emergencyLevel,
      estimatedDuration,
      cost
    } = req.body;

    // Check if veterinarian is available
    const vet = await Veterinarian.findById(veterinarian);
    if (!vet || !vet.isAvailable) {
      return res.status(400).json({
        success: false,
        error: 'Veterinarian is not available'
      });
    }

    const appointment = new VetAppointment({
      pet,
      owner: req.user._id,
      veterinarian,
      serviceType,
      appointmentDate,
      appointmentTime,
      location,
      notes,
      emergencyLevel,
      estimatedDuration,
      cost
    });

    await appointment.save();

    // Update veterinarian's availability if it's an emergency
    if (emergencyLevel === 'Critical') {
      await Veterinarian.findByIdAndUpdate(veterinarian, {
        isAvailable: false
      });
    }

    res.status(201).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get all appointments for a user
exports.getUserAppointments = async (req, res) => {
  try {
    const appointments = await VetAppointment.find({ owner: req.user._id })
      .populate('pet')
      .populate('veterinarian', 'user')
      .populate('veterinarian.user', 'name email');
    res.status(200).json({
      success: true,
      data: appointments
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get all appointments for a veterinarian
exports.getVeterinarianAppointments = async (req, res) => {
  try {
    const appointments = await VetAppointment.find({ veterinarian: req.user._id })
      .populate('pet')
      .populate('owner', 'name email');
    res.status(200).json({
      success: true,
      data: appointments
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get a single appointment
exports.getAppointment = async (req, res) => {
  try {
    const appointment = await VetAppointment.findById(req.params.id)
      .populate('pet')
      .populate('veterinarian', 'user')
      .populate('veterinarian.user', 'name email')
      .populate('owner', 'name email');
    if (!appointment) {
      return res.status(404).json({
        success: false,
        error: 'Appointment not found'
      });
    }
    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Update appointment status
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await VetAppointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!appointment) {
      return res.status(404).json({
        success: false,
        error: 'Appointment not found'
      });
    }

    // If appointment is completed, make veterinarian available again
    if (status === 'Completed') {
      await Veterinarian.findByIdAndUpdate(appointment.veterinarian, {
        isAvailable: true
      });
    }

    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Cancel appointment
exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await VetAppointment.findByIdAndUpdate(
      req.params.id,
      { status: 'Cancelled' },
      { new: true }
    );
    if (!appointment) {
      return res.status(404).json({
        success: false,
        error: 'Appointment not found'
      });
    }

    // Make veterinarian available again
    await Veterinarian.findByIdAndUpdate(appointment.veterinarian, {
      isAvailable: true
    });

    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Add feedback
exports.addFeedback = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const appointment = await VetAppointment.findByIdAndUpdate(
      req.params.id,
      {
        feedback: {
          rating,
          comment
        }
      },
      { new: true }
    );
    if (!appointment) {
      return res.status(404).json({
        success: false,
        error: 'Appointment not found'
      });
    }
    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}; 