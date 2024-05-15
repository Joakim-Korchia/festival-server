const express = require('express');
const router = express.Router();
const performController = require('../controllers/performController');

router.post('/', performController.createPerform);
router.delete('/:artistId/:trackId', performController.deletePerform);

module.exports = router;