const Apartment = require('../models/Apartment');

exports.getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || '';
    const query = search ? { name: { $regex: search, $options: 'i' } } : {};
    const total = await Apartment.countDocuments(query);
    const apartments = await Apartment.find(query)
      .skip((page - 1) * limit)
      .limit(limit);
    res.json({ apartments, total });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.create = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Name is required' });
  try {
    const apartment = new Apartment({ name });
    await apartment.save();
    res.status(201).json(apartment);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}; 