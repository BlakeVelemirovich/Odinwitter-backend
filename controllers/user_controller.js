const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

exports.signup = [
    body('username').trim()
    .escape(),
    body('password').trim(),

    body('password').trim()
    .escape(),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status[400].json({ errors: errors.array() });
        }

        //sanitization here is for use with database quering
        const { username, password } = req.body
        const sanitizedUsername = username.trim();

        //password hashing
        const saltedRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltedRounds);

        try {
            //check if the username is already in the database
            const existingUser = await User.findOne({ username: sanitizedUsername });
            if (existingUser) {
                return res.status(400).json({ error: 'Username already exists' });
            }

            const newUser = new User({
                username: sanitizedUsername,
                password: hashedPassword
            });

            await newUser.save();
            res.status(201).json({ message: 'New user created successfully' });

        } catch(err) {
            console.error(err);
            res.status(500).json({ error: 'Server error'});
        }
    }
];

exports.login = [
    body('username').trim()
    .escape(),

    body('password').trim()
    .escape(),

    async (req, res) => {
        const { username, password } = req.body;

        try {
            const user = await User.findOne({ username }, 'username password');

            if (!user) {
                return res.status(401).json({ error: 'Username not found' });
            }

            const confirmPassword = await bcrypt.compare(password, user.password);
            if (!confirmPassword) {
                return res.status(401).json({ error: 'Password is invalid' });
            }

            const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
            res.json({ token });
        } catch (err) {
            console.error('Error: ', err);
            res.status(500).json({ error: 'Server error' });
        }
    }
];