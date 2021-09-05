const express = require("express")
const router = express.Router()
const User = require("../models/User")

const { body, validationResult } = require('express-validator');

router.post("/",[
    body('name','Enter a valid name').isLength({min: 3}),
    body('email','Email is not valid').isEmail(),
    body('password','password is too weak').isLength({ min: 5 }),
], (req,res)=> {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(404).json({error: errors.array()})
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }).then(() => res.status(200).send("User Created succesfully"))
    .catch(error => {res.status(500).send("Internal Server Error"); console.log(error);})
})

module.exports = router