const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
    try {
        const { username, password, name, contact_number, email } = req.body;
        if (!username || !password || !name || !contact_number || !email) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        // Check for unique username, email, contact
        if (await User.findByUsername(username)) {
            return res.status(409).json({ error: 'Username already exists' });
        }
        if (await User.findByEmail(email)) {
            return res.status(409).json({ error: 'Email already exists' });
        }
        if (await User.findByContact(contact_number)) {
            return res.status(409).json({ error: 'Contact number already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = await User.create({ username, password: hashedPassword, name, contact_number, email });
        res.status(201).json({ message: 'User registered', userId: Number(userId) });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { identifier, password } = req.body;
        if (!identifier || !password) {
            return res.status(400).json({ error: 'Identifier and password are required' });
        }
        const user = await User.findByUsernameOrEmailOrContact(identifier);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token });
    } catch (err) {
        next(err);
    }
};

exports.me = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        // Don't send password
        const { password, ...userInfo } = user;
        res.json(userInfo);
    } catch (err) {
        next(err);
    }
};
