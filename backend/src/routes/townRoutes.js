const express = require('express');
const router = express.Router();
const townController = require('../controllers/townController');

router.get('/', townController.getAllTowns);
router.get('/:id', townController.getTownById);
router.post('/', townController.createTown);
router.put('/:id', townController.updateTown);
router.delete('/:id', townController.deleteTown);

module.exports = router;