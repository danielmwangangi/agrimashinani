const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const register = async (req, res) => {
  const { name, phone, password, role, county, profile_image, language } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      phone,
      password_hash: hashedPassword,
      role,
      county,
      profile_image,
      language,
    });
    res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

const login = async (req, res) => {
  const { phone, password } = req.body;
  try {
    const user = await User.findOne({ where: { phone } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, phone: user.phone }, 'SECRET_KEY', { expiresIn: '7d' });

    res.json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
};

module.exports = { register, login };
