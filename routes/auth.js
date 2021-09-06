const express = require("express")
const User = require("../models/User")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require("dotenv")
const router = express.Router()
env.config()

const sign = process.env.SIGNATURE;
const { body, validationResult } = require('express-validator');

router.post("/signup", [

    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Email is not valid').isEmail(),
    body('password', 'password is too weak').isLength({ min: 5 }),

], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(404).json({ error: errors.array() })
    }
    try {

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        let user = await User.findOne({ email: req.body.email })
        if (user) { return res.status(400).json({ error: "User with email already exists" }) }

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        })

        const authToken = jwt.sign({
            id: user.id
        },sign)

        res.status(200).json({authToken})

    } catch (error) {
        res.status(500).send("Internal Server Error"); console.log(error);
    }
})

module.exports = router