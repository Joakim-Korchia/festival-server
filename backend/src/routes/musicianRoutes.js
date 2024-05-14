const express = require('express');
const router = express.Router();
const musicianController = require('../controllers/musicianController');

router.get('/', musicianController.getAllMusicians);
router.get('/:id', musicianController.getMusicianById);
router.post('/', musicianController.createMusician);
router.put('/:id', musicianController.updateMusician);
router.delete('/:id', musicianController.deleteMusician);

module.exports = router;