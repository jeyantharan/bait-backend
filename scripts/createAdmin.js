// backend/scripts/createAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

async function createAdmin() {
  const uri = "mongodb+srv://ironwood:ironwood@cluster0.gjqyu.mongodb.net/bait";

  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const email = 'bait2025@gmail.com';
  const password = 'Bait2025@';
  const hashed = await bcrypt.hash(password, 10);

  const existing = await User.findOne({ email });
  if (existing) {
    console.log('Admin already exists');
  } else {
    await User.create({ email, password: hashed });
    console.log('Admin created');
  }
  mongoose.disconnect();
}

createAdmin();