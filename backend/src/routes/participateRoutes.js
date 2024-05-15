const express = require('express');
const router = express.Router();
const participateController = require('../controllers/participateController');

router.post('/', participateController.createParticipate);
router.delete('/:artistId/:showId', participateController.deleteParticipate);

module.exports = router;
