import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
const generateToken = (userId) => {
    return jwt.sign({ id: userId },"aalugobijwtsecret", { expiresIn: '1h' });
};

export const register = async (req, res) => {
    console.log("register hit")
    const { username, password } = req.body;

    try {
        const userExists = await User.findOne({ username });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({ username, password });

        res.status(201).json({
            message: 'User registered successfully',
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const login = async (req, res) => {
    console.log("login hit");
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user && (await user.matchPassword(password))) {
            res.json({
                message: 'Login successful',
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
