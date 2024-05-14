const express = require('express');
const router = express.Router();
const repertoryController = require('../controllers/repertoryController');

router.get('/', repertoryController.getAllRepertories);
router.get('/:id', repertoryController.getRepertoryById);
router.post('/', repertoryController.createRepertory);
router.put('/:id', repertoryController.updateRepertory);
router.delete('/:id', repertoryController.deleteRepertory);

module.exports = router;