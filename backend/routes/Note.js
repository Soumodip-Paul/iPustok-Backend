const express = require("express")
const Note = require("../models/Notes")
const verifyToken = require("../middleware/authToken")
const { body, validationResult } = require("express-validator")
const router = express.Router()

// ROUTE 1: fetch all notes: POST /api/notes/getallnotes | login required

router.post('/getallnotes', verifyToken, async (req, res) => {
    try {
        const notes = await Note.find({ uid: req.id })
        res.send(notes)
    }
    catch (e) {
        res.status(500).send("Internal server error");
    }
})

// ROUTE 2: create a note | POST /api/notes/addnote | login required
router.post('/addnote', verifyToken, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('content', "Content must be greater than 5 characters").isLength({ min: 3 })
], async (req, res) => {

    try {
        const { title, content, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }
        const note = new Note({
            title, content, tag, uid: req.id
        });
        const savedNote = await note.save();
        res.send(savedNote);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
})

// ROUTE 3: update a note | PUT /api/notes/updatenote/:id | login required

router.put('/updatenote/:id', verifyToken, async (req, res) => {
    try {
        const newNote = {}
        const { title, content, tag } = req.body;
        if (title) newNote.title = title;
        if (content) newNote.content = content;
        if (tag) newNote.tag = tag;

        const note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found!") }
        if (note.uid.toString() !== req.id) { return res.status(401).send("Not Allowed! ") }
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.send(updatedNote);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
})

// ROUTE 4: delete a note | DELETE /api/notes/deletenote/:id | login required

router.delete('/deletenote/:id', verifyToken, async (req, res) => {

    try {

        const _note = await Note.findById(req.params.id);
        if (!_note) { return res.status(404).send("Not Found! ") }
        if (_note.uid.toString() !== req.id) { return res.status(401).send("Not allowed") }
        const note = await Note.findByIdAndDelete(req.params.id)
        res.send({ success: "Note successfully deleted", note })

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }

})

module.exports = router