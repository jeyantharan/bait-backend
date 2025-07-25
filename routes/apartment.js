const express = require('express');
const router = express.Router();
const apartmentController = require('../controllers/apartmentController');

router.get('/', apartmentController.getAll);
router.post('/', apartmentController.create);

module.exports = router; 