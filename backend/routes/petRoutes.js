const express = require('express');
const router = express.Router();
const {
  createPet,
  getUserPets,
  getPet,
  updatePet,
  deletePet,
  addMedicalHistory,
  addVaccinationRecord
} = require('../controllers/petController');
const { protect } = require('../middlewares/auth');

// All routes are protected and require authentication
router.use(protect);

// Pet routes
router.route('/')
  .post(createPet)
  .get(getUserPets);

router.route('/:id')
  .get(getPet)
  .put(updatePet)
  .delete(deletePet);

// Medical history routes
router.route('/:id/medical-history')
  .post(addMedicalHistory);

// Vaccination routes
router.route('/:id/vaccinations')
  .post(addVaccinationRecord);

module.exports = router; 