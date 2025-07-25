const Booking = require('../models/Booking');

exports.create = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.listByApartment = async (req, res) => {
  try {
    const bookings = await Booking.find({ apartment: req.params.apartmentId });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.update = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.listClients = async (req, res) => {
  try {
    const search = req.query.search || '';
    const match = search ? { clientName: { $regex: search, $options: 'i' } } : {};
    const clients = await Booking.aggregate([
      { $match: match },
      {
        $group: {
          _id: '$clientName',
          bookings: { $push: '$$ROOT' },
          totalBookings: { $sum: 1 },
          lastBooking: { $max: '$bookingDate' }
        }
      },
      { $sort: { lastBooking: -1 } }
    ]);
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.listClientsByApartment = async (req, res) => {
  try {
    const search = req.query.search || '';
    const match = search ? { clientName: { $regex: search, $options: 'i' } } : {};
    const clients = await Booking.aggregate([
      { $match: match },
      {
        $lookup: {
          from: 'apartments',
          localField: 'apartment',
          foreignField: '_id',
          as: 'apartmentInfo'
        }
      },
      { $unwind: '$apartmentInfo' },
      {
        $group: {
          _id: { apartment: '$apartmentInfo.name', clientName: '$clientName' },
          bookings: { $push: '$$ROOT' },
          totalBookings: { $sum: 1 },
          lastBooking: { $max: '$bookingDate' }
        }
      },
      { $sort: { '_id.apartment': 1, lastBooking: -1 } }
    ]);
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}; 