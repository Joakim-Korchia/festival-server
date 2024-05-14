const express = require('express');
const router = express.Router();
const setlistController = require('../controllers/setlistController');

router.get('/', setlistController.getAllSetlists);
router.get('/:id', setlistController.getSetlistById);
router.post('/', setlistController.createSetlist);
router.put('/:id', setlistController.updateSetlist);
router.delete('/:id', setlistController.deleteSetlist);

module.exports = router;