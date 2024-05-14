const express = require('express');
const router = express.Router();
const responsabilityPersonController = require('../controllers/responsabilityPersonController');

router.get('/', responsabilityPersonController.getAllResponsabilityPersons);
router.get('/:id', responsabilityPersonController.getResponsabilityPersonById);
router.post('/', responsabilityPersonController.createResponsabilityPerson);
router.put('/:id', responsabilityPersonController.updateResponsabilityPerson);
router.delete('/:id', responsabilityPersonController.deleteResponsabilityPerson);

module.exports = router;