const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config()

const connectionString = process.env.DATABASE_STRING

const connectToMongo = () => {
    mongoose.connect(connectionString, () => {
        console.log("connected to mongo");
    })
}

module.exports = connectToMongo