const mongoose = require("mongoose")
const { Schema } = mongoose

const Notes = new Schema({
    heading: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("notes", Notes)