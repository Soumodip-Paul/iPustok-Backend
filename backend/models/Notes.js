const mongoose = require("mongoose")
const { Schema } = mongoose

const Notes = new Schema({
    title: {
        type: String,
        required: true
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    content: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    },
    pinned: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("notes", Notes)