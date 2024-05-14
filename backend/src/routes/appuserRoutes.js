const express = require('express');
const router = express.Router();
const appuserController = require('../controllers/appuserController');

router.get('/', appuserController.getAllAppusers);
router.get('/:id', appuserController.getAppuserById);
router.post('/', appuserController.createAppuser);
router.put('/:id', appuserController.updateAppuser);
router.delete('/:id', appuserController.deleteAppuser);

module.exports = router;