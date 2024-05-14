const express = require('express');
const router = express.Router();
const participateController = require('../controllers/participateController');

router.get('/', participateController.getAllParticipations);
router.get('/:id', participateController.getParticipationById);
router.post('/', participateController.createParticipation);
router.put('/:id', participateController.updateParticipation);
router.delete('/:id', participateController.deleteParticipation);

module.exports = router;