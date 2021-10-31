const express = require("express")
const Pages = require('../models/Page')
const verifyToken = require("../middleware/authToken")
const { body, validationResult } = require("express-validator")
const router = express.Router()
const User = require('../models/User')

// ROUTE 1: get page : GET /api/page/:url | login not required

router.get('/:url', async (req, res) => {
    try {
        const notes = await Pages.findOne({url : req.params.url})
        if (notes) return res.status(200).send(notes)
        else return res.status(404).send("Page Not Found")
    }
    catch (e) {
        console.log(e)
        res.status(500).send("Internal server error");
    }
})

// ROUTE 2: create a note | POST /api/page/addpage | login required
router.post('/addpage', verifyToken,
    body('url', 'Enter a valid url').isAlphanumeric(),
    body('content', "Content must be greater than 5 characters").isLength({ min: 5 })
    , async (req, res) => {

        try {
            const user = await User.findById(req.id)
            if (!user.isAdmin) return res.status(401).send("Not Allowed")
            let { url, content } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json(errors.array())
            url = url.split(/\s+/).filter( e => e.length !== 0 ).join('-')
            const page = new Pages({ url, content });
            const savedPage = await page.save();
            res.status(200).json(savedPage);
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal server error")
        }
    })

// ROUTE 3: update a note | PUT /api/page/updatepage | login required

router.put('/updatepage', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.id)
        if (!user.isAdmin) return res.status(401).send("Not allowed")
        const newNote = {}
        const { url,content } = req.body;
        if (content) newNote.content = content;

        const page = await Pages.findOne({ url });
        if (!page) return res.status(404).send("Not Found!")
        const updatedPage = await Pages.findByIdAndUpdate(page._id, { $set: newNote }, { new: true })
        res.status(200).json(updatedPage)
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
})

// ROUTE 4: delete a note | DELETE /api/notes/deletenote/:id | login required

router.delete('/deletepage/:url', verifyToken, async (req, res) => {

    try {
        const user = await User.findById(req.id)
        if (!user.isAdmin) return res.status(401).send("Not allowed")
        const page = await Pages.findOne({ url: req.params.url });
        if (!page) return res.status(404).send("Not Found! ")
        const pages = await Pages.findByIdAndDelete(page._id)
        res.send({ success: "Note successfully deleted", pages })

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }

})

module.exports = router