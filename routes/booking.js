const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/', bookingController.create);
router.get('/:apartmentId', bookingController.listByApartment);
router.put('/:id', bookingController.update);
router.get('/clients/all', bookingController.listClients);
router.get('/clients/by-apartment', bookingController.listClientsByApartment);

module.exports = router; 