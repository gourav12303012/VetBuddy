const express = require('express');
const router = express.Router();
const {
  createVeterinarian,
  getVeterinarians,
  getNearbyVeterinarians,
  getVeterinarian,
  updateVeterinarian,
  updateAvailability,
  addReview
} = require('../controllers/veterinarianController');
const { protect, authorize } = require('../middlewares/auth');

// Public routes
router.route('/nearby')
  .get(getNearbyVeterinarians);

router.route('/')
  .get(getVeterinarians);

router.route('/:id')
  .get(getVeterinarian);

// Protected routes
router.use(protect);

// Veterinarian registration
router.route('/register')
  .post(createVeterinarian);

// Veterinarian operations
router.route('/:id/availability')
  .put(authorize('veterinarian'), updateAvailability);

router.route('/:id/reviews')
  .post(addReview);

// Admin routes
router.route('/:id')
  .put(authorize('admin'), updateVeterinarian);

module.exports = router; 