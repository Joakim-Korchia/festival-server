const express = require('express');
const router = express.Router();
const specialisationController = require('../controllers/specialisationController');

router.get('/', specialisationController.getAllSpecialisations);
router.get('/:id', specialisationController.getSpecialisationById);
router.post('/', specialisationController.createSpecialisation);
router.put('/:id', specialisationController.updateSpecialisation);
router.delete('/:id', specialisationController.deleteSpecialisation);

module.exports = router;