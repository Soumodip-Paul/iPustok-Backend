const mongoose = require("mongoose")
const { Schema } = mongoose

const Pages = new Schema({
    url: {
        type: String,
        required: true,
        unique: true
    },
    content : {
        type: String,
        default: "Sample Page"
    }
})

module.exports = mongoose.model("notes", Pages)