const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  apartment: { type: mongoose.Schema.Types.ObjectId, ref: 'Apartment', required: true },
  clientName: { type: String, required: true },
  bookingDate: { type: Date, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  price: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  paid: { type: Boolean, default: false },
  specialNote: { type: String },
  guests: { type: Number, required: true }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking; 