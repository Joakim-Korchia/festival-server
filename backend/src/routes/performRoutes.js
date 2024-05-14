const express = require('express');
const router = express.Router();
const performController = require('../controllers/performController');

router.get('/', performController.getAllPerformances);
router.get('/:id', performController.getPerformanceById);
router.post('/', performController.createPerformance);
router.put('/:id', performController.updatePerformance);
router.delete('/:id', performController.deletePerformance);

module.exports = router;