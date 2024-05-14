const express = require('express');
const router = express.Router();
const specialityController = require('../controllers/specialityController');

router.get('/', specialityController.getAllSpecialities);
router.get('/:id', specialityController.getSpecialityById);
router.post('/', specialityController.createSpeciality);
router.put('/:id', specialityController.updateSpeciality);
router.delete('/:id', specialityController.deleteSpeciality);

module.exports = router;