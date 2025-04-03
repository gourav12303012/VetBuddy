const express = require('express');
const router = express.Router();
const {
  createAppointment,
  getUserAppointments,
  getVeterinarianAppointments,
  getAppointment,
  updateAppointmentStatus,
  cancelAppointment,
  addFeedback
} = require('../controllers/vetAppointmentController');
const { protect, authorize } = require('../middlewares/auth');

// All routes are protected
router.use(protect);

// User routes
router.route('/')
  .post(createAppointment)
  .get(getUserAppointments);

router.route('/:id')
  .get(getAppointment)
  .put(updateAppointmentStatus)
  .delete(cancelAppointment);

router.route('/:id/feedback')
  .post(addFeedback);

// Veterinarian routes
router.route('/veterinarian/appointments')
  .get(authorize('veterinarian'), getVeterinarianAppointments);

module.exports = router; 