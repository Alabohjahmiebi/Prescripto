// import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const users = []; // temporary in-memory store

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = users.find(u => u.email === email);
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    users.push({ name, email, password: hashed });

    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ email }, 'secret', { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
