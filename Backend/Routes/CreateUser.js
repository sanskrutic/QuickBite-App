const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const jwtSecret = "welcometoworld#$";

// ✅ Create a new user
router.post(
    "/createuser",
    [
        body('email', 'Invalid email').isEmail(),
        body('name', 'Name must be at least 4 characters long').isLength({ min: 4 }),
        body('password', 'Password must be at least 6 characters long').isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // ✅ Hash password correctly
            const salt = await bcrypt.genSalt(10); // Corrected function name
            const secpassword = await bcrypt.hash(req.body.password, salt);

            await User.create({
                name: req.body.name,
                password: secpassword,
                email: req.body.email,
                location: req.body.location
            });

            res.json({ success: true });
        } catch (error) {
            console.error("❌ Error creating user:", error);
            res.status(500).json({ success: false, error: "Internal Server Error" });
        }
    }
);

// ✅ User login
router.post(
    "/loginuser",
    [
        body('email', 'Invalid email').isEmail(),
        body('password', 'Password must be at least 6 characters long').isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let userData = await User.findOne({ email: req.body.email });
            if (!userData) {
                return res.status(400).json({ error: "Invalid credentials" });
            }

            // ✅ Compare hashed password correctly
            const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
            if (!pwdCompare) {
                return res.status(400).json({ error: "Invalid credentials" });
            }

            // ✅ Generate JWT Token
            const data = { user: { id: userData.id } };
            const authToken = jwt.sign(data, jwtSecret, { expiresIn: "1h" });

            return res.json({ success: true, authToken: authToken });
        } catch (error) {
            console.error("❌ Error logging in:", error);
            res.status(500).json({ success: false, error: "Internal Server Error" });
        }
    }
);

module.exports = router;
